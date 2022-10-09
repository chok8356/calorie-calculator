<template>
  <div
    :class="[
      $style.root,
      {
        [$style[size]]: size,
      },
    ]">
    <template
      v-for="[key, value] in Object.entries(facts || {})"
      :key="key">
      <label>{{ key }}</label>
      <b>{{ ((value / 100) * amount).toFixed(2) }}</b>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { getEmptyProductNutritionFacts } from '../../lib';
import type { ProductNutritionFacts } from '@/shared/api';

withDefaults(
  defineProps<{
    facts: ProductNutritionFacts;
    amount?: number;
    size?: 'sm' | 'md';
  }>(),
  {
    facts: () => getEmptyProductNutritionFacts(),
    amount: 100,
    size: 'md',
  },
);
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: grid;
  font-size: 0.9rem;
  gap: 0 1rem;
  grid-template-columns: auto 1fr;

  label {
    color: var(--color-grey-75);

    &::first-letter {
      text-transform: uppercase;
    }
  }

  b {
    font-weight: 500;
  }

  &.sm {
    font-size: 0.9rem;
  }

  &.md {
    font-size: 1rem;
  }
}
</style>
