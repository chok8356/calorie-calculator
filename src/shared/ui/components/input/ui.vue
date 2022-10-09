<template>
  <input
    :class="[
      $style.input,
      {
        [$style[type]]: type,
        [$style[size]]: size,
      },
    ]"
    :placeholder="placeholder"
    :value="value"
    v-bind="$attrs"
    @input="updateValue" />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    value?: string;
    placeholder?: string;
    type?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    value: '',
    placeholder: '',
    type: 'primary',
    size: 'md',
  },
);

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const updateValue = (e: Event) => {
  emit('update:value', (e?.target as HTMLInputElement)?.value || '');
};
</script>

<style lang="scss" module>
.input {
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 0.25rem;
  color: var(--color-grey-100);
  font-family: inherit;
  font-size: 1rem;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding: 0.75rem;
  transition: outline 100ms ease-in;
  width: 100%;

  &:focus {
    outline-color: var(--color-primary-50);
  }

  &.primary {
    background-color: var(--color-grey-5);

    &::placeholder {
      color: var(--color-grey-25);
    }
  }

  &.secondary {
    border: 1px solid var(--color-grey-25);

    &::placeholder {
      color: var(--color-grey-30);
    }
  }

  &.sm {
    font-size: 0.9rem;
    height: 2rem;
    max-height: 2rem;
    min-height: 2rem;
  }

  &.md {
    font-size: 0.9rem;
    height: 2.5rem;
    max-height: 2.5rem;
    min-height: 2.5rem;
  }

  &.lg {
    font-size: 1rem;
    height: 3rem;
    max-height: 3rem;
    min-height: 3rem;
  }
}
</style>
