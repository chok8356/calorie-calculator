<template>
  <div
    :class="[
      $style.form,
      {
        [$style.editing]: productStore.editing,
      },
    ]">
    <h3>{{ productStore.editing ? 'Edit' : 'Create' }} product</h3>

    <div :class="$style.inputs">
      <label> Name </label>
      <Input v-model:value="product.name" />

      <label> Description </label>
      <Input v-model:value="product.description" />

      <template
        v-for="(_, key) in product?.nutritionFacts || {}"
        :key="key">
        <label> {{ key }} </label>
        <InputNumber v-model:value="product.nutritionFacts[key]" />
      </template>
    </div>

    <div :class="$style.buttons">
      <UpdateProduct v-if="productStore.editing" />
      <CreateProduct v-else />
      <Button
        type="secondary"
        @click.stop="clear">
        {{ productStore.editing ? 'Cancel' : 'Clear' }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount } from 'vue';
import type { Product } from '@/shared/api';
import { productLib, productModel } from '@/entities/product';
import { CreateProduct } from '@/features/create-product';
import { Button, Input, InputNumber } from '@/shared/ui/components';
import { UpdateProduct } from '@/widgets/update-product';

const productStore = productModel.use();

const product = computed<Product>({
  get() {
    return productStore.productForForm;
  },
  set(product: Product) {
    productStore.setProductForForm(product);
  },
});

const clear = () => {
  productStore.setProductForForm(productLib.getEmptyProduct());
  productStore.setEditing(false);
};

onBeforeUnmount(() => {
  clear();
});
</script>

<style lang="scss" module>
.form {
  background-color: var(--color-grey-0);
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  h3 {
    line-height: 1;
  }
}

.inputs {
  align-items: center;
  display: grid;
  gap: 1rem;
  grid-template-columns: auto 1fr;

  label {
    color: var(--color-grey-75);

    &::first-letter {
      text-transform: uppercase;
    }
  }
}

.buttons {
  display: flex;
  gap: 0.5rem;
  width: 100%;

  & > * {
    flex-grow: 1;
  }
}

@media screen and (max-width: 992px) {
  .editing {
    height: 100vh;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 2;
  }
}
</style>
