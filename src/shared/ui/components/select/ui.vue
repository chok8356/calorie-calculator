<template>
  <div :class="$style.root">
    <Input
      :placeholder="placeholder"
      :size="size"
      :type="type"
      :value="displayValue"
      @blur="blur"
      @focus="focus"
      @update:value="input" />
    <div
      v-if="focused"
      :class="$style.options">
      <div
        v-for="(option, key) in filteredOptions"
        :key="key"
        :class="$style.option"
        @mousedown.stop="select(option)">
        {{ option.label }}
      </div>
      <div
        v-if="!filteredOptions.length"
        :class="$style.empty">
        Nothing found...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { lodash } from '@/shared/lib';
import { Input } from '@/shared/ui/components';

type Option = {
  label: string;
  value: any;
};

const props = withDefaults(
  defineProps<{
    value?: any;
    options: Option[];
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    type?: 'primary' | 'secondary';
  }>(),
  {
    value: undefined,
    placeholder: '',
    type: 'primary',
    size: 'md',
  },
);

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
  (e: 'input', value: string): void;
}>();

const query = ref('');

const input = (q: string) => {
  query.value = q;
  emit('input', q);
};

const focused = ref(false);

const displayValue = computed<string>(() => {
  if (focused.value) return query.value;
  return selectedOption.value.label || '';
});

const filteredOptions = computed(() => {
  if (!query.value) return props.options;
  return props.options.filter((x) => x.label.toLowerCase().includes(query.value.toLowerCase()));
});

const selectedOption = computed<Option>(() => {
  const option = props.options.find((x) => lodash.isEqual(x.value, props.value));
  if (option) return option;
  return {
    label: '',
    value: undefined,
  };
});

const focus = () => {
  focused.value = true;
};

const blur = () => {
  focused.value = false;
  query.value = '';
};

const select = (option: Option) => {
  emit('update:value', option.value);
};
</script>

<style lang="scss" module>
.root {
  position: relative;
}

.options {
  background-color: var(--color-grey-0);
  border-radius: 0.25rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
  padding: 0.5rem;
  position: absolute;
  top: 100%;
  transform: translateY(0.245rem);
  width: 100%;
  z-index: 1;
}

.option {
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  padding: 0.25rem 0.75rem;
  width: 100%;

  &:hover {
    background-color: var(--color-grey-5);
    color: var(--color-primary-75);
  }
}

.empty {
  color: var(--color-grey-25);
  padding: 0.25rem 0.75rem;
  width: 100%;
}
</style>
