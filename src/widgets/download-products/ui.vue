<template>
  <Button
    type="secondary"
    @click="productStore.downloadProductsAsync">
    Download products
  </Button>
</template>

<script lang="ts" setup>
import { productModel } from '@/entities/product';
import { Button } from '@/shared/ui/components';

const productStore = productModel.use();
</script>
