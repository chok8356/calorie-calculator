<template>
  <label
    :class="[
      $style.root,
      {
        [$style.checked]: value,
      },
    ]">
    <!--checkmark-->
    <span :class="$style.checkmark">
      <input
        aria-hidden="true"
        :checked="value"
        type="checkbox"
        :value="value"
        @change="updateValue" />
      <IconCheck v-if="value" />
    </span>

    <!--label-->
    <span
      v-if="$slots.default"
      :class="$style.text">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" setup>
import { IconCheck } from '@/shared/ui/icons';

withDefaults(
  defineProps<{
    value?: boolean;
  }>(),
  {
    value: false,
  },
);

const emit = defineEmits<{
  (e: 'update:value', value: boolean): void;
}>();

const updateValue = (e: Event) => {
  emit('update:value', (e?.target as HTMLInputElement)?.checked || false);
};
</script>

<style lang="scss" module>
.root {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  max-width: 100%;
  width: auto;
}

.checkmark {
  align-items: center;
  background-color: var(--color-grey-20);
  border-radius: 3px;
  color: var(--color-white);
  display: inline-flex;
  font-size: 1rem;
  height: 1rem;
  justify-content: center;
  padding: 0.25rem;
  position: relative;
  width: 1rem;

  input {
    appearance: none;
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
}

.text {
  align-items: center;
  display: block;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.checked {
  .checkmark {
    background-color: var(--color-primary-50);
  }
}
</style>
