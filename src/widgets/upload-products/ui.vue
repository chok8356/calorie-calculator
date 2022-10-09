<template>
  <div :class="$style.root">
    <InputFile
      accept=".json"
      @update:value="uploadProductsStore.uploadProductFromFile">
      Upload products
    </InputFile>
    <Checkbox v-model:value="uploadProductsStore.replaceCreatedProducts">
      After upload all created early products will be deleted
    </Checkbox>
  </div>
</template>

<script lang="ts" setup>
import { uploadProductsModel } from './index';
import { Checkbox, InputFile } from '@/shared/ui/components';

const uploadProductsStore = uploadProductsModel.use();
</script>

<style lang="scss" module>
.root {
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
  width: auto;
}
</style>
