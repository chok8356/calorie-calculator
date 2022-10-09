<template>
  <Input
    placeholder="Product search by name"
    size="lg"
    type="secondary"
    :value="productStore.query"
    @update:value="productStore.setQuery" />
</template>

<script lang="ts" setup>
import { productModel } from '@/entities/product';
import { Input } from '@/shared/ui/components';

const productStore = productModel.use();
</script>
