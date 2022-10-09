<template>
  <div
    :class="[
      $style.root,
      {
        [$style.dragging]: dragging,
        [$style.uploaded]: value,
      },
    ]"
    @dragenter.prevent="dragenter"
    @dragleave.prevent="dragleave"
    @dragover.prevent
    @drop.prevent="drop">
    <div :class="$style.content">
      <!--upload-->
      <template v-if="!value">
        <Button
          :class="$style.button"
          @click="chooseFile">
          <slot></slot>
        </Button>
        <input
          ref="input"
          :accept="accept"
          :class="$style.input"
          type="file"
          @change="change" />

        <!--info-->
        <div :class="$style.info">
          {{
            formats.length
              ? 'Or drag files of these formats here'
              : 'Or drag and drop files of any format here'
          }}
        </div>

        <!--formats-->
        <div
          v-if="formats.length"
          :class="$style.formats">
          <span
            v-for="(format, index) in formats"
            :key="index"
            :class="$style.format">
            {{ format }}
          </span>
        </div>
      </template>

      <!--uploaded-->
      <template v-if="value">
        <!--title-->
        <h4>Uploaded</h4>

        <!--filename-->
        <span
          v-if="value"
          :class="$style.info"
          :title="value.name">
          {{ value.name }}
        </span>

        <!--upload again-->
        <Button
          :class="$style.button"
          @click="updateValue(undefined)">
          Upload again
        </Button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Button } from '@/shared/ui/components';

const props = withDefaults(
  defineProps<{
    value?: File;
    accept?: string;
  }>(),
  {
    value: undefined,
    accept: '',
  },
);

const input = ref<HTMLInputElement | null>(null);

const formats = computed(() => {
  return props.accept?.split(',').filter((x) => !!x);
});

const chooseFile = () => input.value?.click();

// Drag and Drop
const dragging = ref(false);

const dragenter = () => {
  dragging.value = true;
};

const dragleave = () => {
  dragging.value = false;
};

const drop = (e: DragEvent) => {
  dragging.value = false;
  updateValue(e?.dataTransfer?.files?.[0]);
};

const change = (e: Event) => {
  updateValue((e?.target as HTMLInputElement)?.files?.[0]);
};

// Listeners
const emit = defineEmits<{
  (e: 'update:value', value: File | undefined): void;
}>();

const updateValue = (file: File | undefined) => {
  if (file) {
    const extension = file.name.split('.').pop();
    if (extension && props.accept && !props.accept.includes(extension)) return;
  }
  emit('update:value', file);
};
</script>

<style lang="scss" module>
.root {
  align-items: center;
  border: 1px dashed var(--color-grey-25);
  border-radius: 0.5rem;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  overflow: auto;
  padding: 2rem;
  text-align: center;
  width: auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin: auto;
  width: 100%;
}

.info {
  color: var(--color-grey-40);
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.button {
  white-space: nowrap;
  width: 100%;
}

.input {
  display: none;
}

.formats {
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.format {
  background-color: var(--color-grey-10);
  border-radius: 0.25rem;
  color: var(--color-grey-50);
  font-size: 0.85rem;
  line-height: 1;
  padding: 0.5rem 0.75rem;
}

// State
.dragging {
  background-color: var(--color-grey-10);
  opacity: 0.5;

  * {
    pointer-events: none;
  }
}

.uploaded {
  background-color: var(--color-grey-10);

  .info {
    color: var(--color-grey-50);
  }
}
</style>
