<template>
  <LayoutMain>
    <template #title> Meal Plan </template>
    <template #content>
      <template v-if="productStore.productsList.length">
        <AddProductToMealPlan :class="$style.add" />
        <div :class="$style.list">
          <template
            v-for="productId in mealPlanStore.mealPlanProductsIdsList"
            :key="productId">
            <ProductRow
              :amount="mealPlanStore.mealPlan.products[productId]"
              :class="$style.row"
              :product="productStore.products[productId]">
              <template #extra>
                <div :class="$style.extra">
                  <DeleteProductFromMealPlan
                    :id="productId"
                    :class="$style.icon" />

                  <InputNumber
                    :class="$style.amount"
                    size="sm"
                    type="secondary"
                    :value="mealPlanStore.mealPlan.products[productId]"
                    @update:value="
                      (v) =>
                        mealPlanStore.updateProductInMealPlanAsync({
                          [productId]: v,
                        })
                    " />
                </div>
              </template>
            </ProductRow>
          </template>
        </div>
      </template>
      <div v-else>
        Your
        <RouterLink
          :class="$style.link"
          to="/products">
          products database
        </RouterLink>
        is empty. Please create at least one product.
      </div>
    </template>
    <template #sidebar>
      <MealPlanTotalInfo />
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { mealPlanModel } from '@/entities/meal-plan';
import { productModel, ProductRow } from '@/entities/product';
import { AddProductToMealPlan } from '@/features/add-product-to-meal-plan';
import { DeleteProductFromMealPlan } from '@/features/delete-product-from-meal-plan';
import { InputNumber } from '@/shared/ui/components';
import { LayoutMain } from '@/shared/ui/layouts';
import { MealPlanTotalInfo } from '@/widgets/meal-plan-total-info';

const productStore = productModel.use();
const mealPlanStore = mealPlanModel.use();

onMounted(async () => {
  await productStore.getProductsAsync();
  await mealPlanStore.getMealPlanAsync();
});
</script>

<style lang="scss" module>
.add {
  width: 100%;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.row {
  .icon {
    visibility: hidden;
  }

  &:hover {
    .icon {
      visibility: visible;
    }
  }
}

.extra {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.amount {
  width: 6rem;
}
</style>
