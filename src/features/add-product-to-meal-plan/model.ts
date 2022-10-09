import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { Product } from '@/shared/api';
import { mealPlanModel } from '@/entities/meal-plan';
import { productModel } from '@/entities/product';

export const NAMESPACE = 'add-product-to-meal-plan';

export const use = defineStore(NAMESPACE, () => {
  const mealPlanStore = mealPlanModel.use();
  const productStore = productModel.use();

  const products = computed<{ label: string; value: string }[]>(() => {
    const result = [];
    for (const product of productStore.productsList) {
      if (mealPlanStore.mealPlanProductsIdsList.includes(product.id)) continue;
      result.push({
        label: product.name,
        value: product.id,
      });
    }
    return result;
  });

  const selectProduct = (id: Product['id']) => {
    mealPlanStore.updateProductInMealPlanAsync({ [id]: 0 });
  };

  return {
    products,
    selectProduct,
  };
});
