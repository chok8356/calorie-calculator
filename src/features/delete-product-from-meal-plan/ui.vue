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
import { IconTrash } from '@/shared/ui/icons';

const mealPlanStore = mealPlanModel.use();

const props = defineProps<{
  id?: Product['id'];
}>();

const click = () => {
  if (!props.id) return;
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
  color: var(--color-grey-20);
  cursor: pointer;
  user-select: none;

  &:hover {
    color: var(--color-primary-75);
  }
}
</style>
