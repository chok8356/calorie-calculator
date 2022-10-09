<template>
  <LayoutMain>
    <template #title> Products </template>
    <template #content>
      <template v-if="productStore.productsList.length">
        <ProductsFilter :class="$style.filter" />
        <div
          v-if="productStore.productsList.length"
          :class="$style.list">
          <ProductRow
            v-for="product in productStore.filteredList"
            :key="product.id"
            :class="[
              $style.row,
              {
                [$style.rowEditing]: product.id === productStore.productForForm.id,
              },
            ]"
            :product="product">
            <template #extra>
              <div :class="$style.extra">
                <DeleteProduct
                  :id="product.id"
                  :class="$style.icon" />
                <EditProduct
                  :id="product.id"
                  :class="$style.icon" />
              </div>
            </template>
          </ProductRow>
        </div>
      </template>
      <div v-else>Your products database is empty. Please create at least one product.</div>
    </template>
    <template #sidebar>
      <ProductForm />
    </template>
  </LayoutMain>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ProductRow, productModel } from '@/entities/product';
import { DeleteProduct } from '@/features/delete-product';
import { EditProduct } from '@/features/edit-product';
import { ProductsFilter } from '@/features/products-filter';
import { LayoutMain } from '@/shared/ui/layouts';
import { ProductForm } from '@/widgets/product-form';

const productStore = productModel.use();

onMounted(async () => {
  await productStore.getProductsAsync();
});
</script>

<style lang="scss" module>
.filter {
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

  &Editing {
    .icon {
      visibility: visible;
    }
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
</style>
