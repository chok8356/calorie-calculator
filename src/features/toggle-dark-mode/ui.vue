<template>
  <div
    :class="$style.root"
    @click="appStore.changeTheme">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { appModel } from '@/entities/app';

const appStore = appModel.use();
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  width: auto;
}
</style>
