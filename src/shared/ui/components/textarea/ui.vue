<template>
  <textarea
    class="scrollbar"
    :class="$style.textarea"
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
  }>(),
  {
    value: '',
    placeholder: '',
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
.textarea {
  appearance: none;
  background-color: var(--color-grey-5);
  border: none;
  border-radius: 0.25rem;
  color: var(--color-grey-100);
  font-family: inherit;
  font-size: 0.9rem;
  min-height: 2.5rem;
  outline: 2px solid transparent;
  outline-offset: -2px;
  padding: 0.75rem;
  resize: none;
  transition: outline 100ms ease-in;
  width: 100%;

  &:focus {
    outline-color: var(--color-primary-50);
  }

  &::placeholder {
    color: var(--color-grey-25);
  }
}
</style>
