<template>
  <div
    :class="$style.root"
    @click="click">
    <slot>
      <IconTrash :class="$style.icon" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/shared/api';
import { mealPlanModel } from '@/entities/meal-plan';
import { productLib, productModel } from '@/entities/product';
import { IconTrash } from '@/shared/ui/icons';

const props = defineProps<{
  id?: Product['id'];
}>();

const productStore = productModel.use();
const mealPlanStore = mealPlanModel.use();

const click = () => {
  if (!props.id) return;
  if (props.id === productStore.productForForm.id) {
    productStore.setProductForForm(productLib.getEmptyProduct());
    productStore.setEditing(false);
  }
  productStore.deleteProductByIdAsync({ id: props.id });
  mealPlanStore.deleteProductFromMealPlanAsync(props.id);
};
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  width: auto;
}

.icon {
  color: var(--color-grey-25);
  cursor: pointer;
  user-select: none;

  &:hover {
    color: var(--color-primary-75);
  }
}
</style>
