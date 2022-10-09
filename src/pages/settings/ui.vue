<template>
  <LayoutMain>
    <template #title> Settings </template>
    <template #content>
      <UploadProducts />
      <DownloadProducts :class="$style.download" />
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { LayoutMain } from '@/shared/ui/layouts';
import { DownloadProducts } from '@/widgets/download-products';
import { UploadProducts } from '@/widgets/upload-products';
</script>

<style lang="scss" module>
.download {
  margin-top: 1rem;
}
</style>
