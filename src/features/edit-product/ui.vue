<template>
  <div
    :class="$style.root"
    @click="click">
    <slot>
      <IconPen :class="$style.icon" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/shared/api';
import { productModel } from '@/entities/product';
import { IconPen } from '@/shared/ui/icons';

const props = defineProps<{
  id?: Product['id'];
}>();

const productStore = productModel.use();

const click = async () => {
  if (!props.id) return;
  const product = await productStore.getProductByIdAsync({ id: props.id });
  if (product) {
    productStore.setProductForForm(product);
    productStore.setEditing(true);
  }
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
  color: var(--color-grey-20);
  cursor: pointer;
  user-select: none;

  &:hover {
    color: var(--color-primary-75);
  }
}
</style>
