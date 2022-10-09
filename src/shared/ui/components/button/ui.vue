<template>
  <button
    :class="[
      $style.button,
      {
        [$style[type]]: type,
        [$style.disabled]: disabled,
      },
    ]"
    :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'primary' | 'secondary';
    disabled?: boolean;
  }>(),
  {
    type: 'primary',
    disabled: false,
  },
);
</script>

<style lang="scss" module>
.button {
  align-items: center;
  appearance: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  height: 2.5rem;
  justify-content: center;
  outline: none;
  padding: 0 1.25rem;
  transition: background-color 100ms ease-in;
  user-select: none;
  white-space: nowrap;
}

.disabled {
  pointer-events: none;
}

.primary {
  background-color: var(--color-primary-50);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-primary-55);
  }

  &:focus {
    box-shadow: inset 0 0 0 2px var(--color-primary-50), inset 0 0 0 3px var(--color-grey-0);
  }

  &:active {
    background-color: var(--color-primary-65);
  }

  &.disabled {
    background-color: var(--color-grey-30);
  }
}

.secondary {
  background-color: transparent;
  border: 1px solid var(--color-primary-50);
  color: var(--color-primary-50);

  &:hover,
  &:active,
  &:focus {
    color: var(--color-white);
  }

  &:hover {
    background-color: var(--color-primary-55);
  }

  &:focus {
    background-color: var(--color-primary-50);
    box-shadow: inset 0 0 0 1px var(--color-primary-50), inset 0 0 0 2px var(--color-grey-0);
  }

  &:active {
    background-color: var(--color-primary-65);
  }

  &.disabled {
    border-color: var(--color-grey-30);
    color: var(--color-grey-30);
  }
}
</style>
