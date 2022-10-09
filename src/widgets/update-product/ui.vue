<template>
  <Button @click.stop="save">Save</Button>
</template>

<script lang="ts" setup>
import { productLib, productModel } from '@/entities/product';
import { Button } from '@/shared/ui/components';

const productStore = productModel.use();

const save = async () => {
  productStore.updateProductByIdAsync({ product: productStore.productForForm });
  productStore.setProductForForm(productLib.getEmptyProduct());
  productStore.setEditing(false);
};
</script>
