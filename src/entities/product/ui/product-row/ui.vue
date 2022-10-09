<template>
  <div :class="$style.root">
    <div
      :class="$style.content"
      @mousedown="opened = !opened">
      <h4 :class="$style.name">{{ product.name }}</h4>
      <div
        :class="$style.extra"
        @mousedown.stop>
        <slot name="extra"></slot>
      </div>
      <IconAngleDown
        :class="[
          $style.icon,
          {
            [$style.iconOpened]: opened,
          },
        ]">
      </IconAngleDown>
    </div>

    <div
      v-if="opened"
      :class="$style.spoiler">
      <ProductNutritionFactsList
        :amount="amount"
        :facts="product.nutritionFacts"
        size="sm" />
      <p
        v-if="product.description"
        :class="$style.description">
        {{ product.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Product } from '@/shared/api';
import { productLib, ProductNutritionFactsList } from '@/entities/product';
import { IconAngleDown } from '@/shared/ui/icons';

withDefaults(
  defineProps<{
    product: Product;
    amount?: number;
  }>(),
  {
    product: () => productLib.getEmptyProduct(),
    amount: 100,
  },
);

const opened = ref(false);
</script>

<style lang="scss" module>
.root {
  background-color: var(--color-grey-0);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  width: 100%;

  .extra {
    align-items: center;
    display: inline-flex;
    margin-left: auto;
    width: auto;
  }
}

.content {
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  min-height: 3rem;
  padding: 0.5rem 1rem;
  user-select: none;
}

.name {
  display: block;
  font-weight: 500;
  margin: 0;
  overflow: hidden;
  padding: 0;
  text-overflow: ellipsis;
  user-select: text;
  white-space: nowrap;
}

.icon {
  color: var(--color-grey-25);
  cursor: pointer;
  transform-origin: center;
  user-select: none;

  &:hover {
    color: var(--color-grey-75);
  }

  &Opened {
    color: var(--color-grey-50);
    transform: rotate(180deg);
  }
}

// Spoiler
.spoiler {
  align-items: start;
  border-top: 1px solid var(--color-grey-10);
  display: grid;
  gap: 4rem;
  grid-template-columns: auto 1fr;
  margin: 1rem;
  margin-top: 0;
  padding-top: 1rem;
}

.description {
  color: var(--color-grey-50);
  font-size: 0.8rem;
  margin: 0 0 1rem;
}

@media screen and (max-width: 768px) {
  .spoiler {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
}
</style>
