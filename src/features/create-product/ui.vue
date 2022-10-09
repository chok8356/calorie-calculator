<template>
  <Button
    :disabled="disabled"
    @click.stop="click">
    Add
  </Button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { productLib, productModel } from '@/entities/product';
import { Button } from '@/shared/ui/components';

const productStore = productModel.use();

const disabled = computed(() => {
  return !productStore.productForForm.name;
});

const click = async () => {
  productStore.createProductAsync({ product: productStore.productForForm });
  productStore.setProductForForm(productLib.getEmptyProduct());
};
</script>
