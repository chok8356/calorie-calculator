<template>
  <Input
    v-bind="$attrs"
    inputmode="numeric"
    :placeholder="placeholder"
    :size="size"
    :type="type"
    :value="displayValue"
    @beforeinput="beforeinput"
    @blur="blur"
    @focus="focus"
    @update:value="updateValue" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Input } from '@/shared/ui/components';

const PRECISION = 2;

const props = withDefaults(
  defineProps<{
    value?: number;
    placeholder?: string;
    type?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    value: 0,
    placeholder: '',
    type: 'primary',
    size: 'md',
  },
);

const emit = defineEmits<{
  (e: 'update:value', value: number): void;
}>();

const focused = ref(false);
const userInput = ref('');

const displayValue = computed(() => {
  if (focused.value) return userInput.value;
  return stringValue.value;
});

const stringValue = computed(() => {
  if (props.value === Infinity) return '0';
  if (props.value === -Infinity) return '0';
  return props.value.toFixed(PRECISION);
});

// Listeners
const updateValue = (value: string) => {
  userInput.value = value;
  emit('update:value', parseFloat(parseFloat(value).toFixed(PRECISION)) || 0);
};

const focus = () => {
  focused.value = true;
  userInput.value = stringValue.value;
};

const blur = () => {
  focused.value = false;
  userInput.value = '';
};

const beforeinput = (e: InputEvent) => {
  if (e.data && e.inputType === 'insertText') {
    const character = e.data;

    if (!/^\d{1}$/.test(e.data)) {
      if (character !== '.') e.preventDefault();
    }

    if (userInput.value.includes('.')) {
      if (character === '.') e.preventDefault();
    }
  }
};
</script>
