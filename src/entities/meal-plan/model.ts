import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { MealPlan, MealPlanProduct, Product } from '@/shared/api';
import { storageApi } from '@/shared/api';

export const NAMESPACE = 'meal-plan';

export const use = defineStore(NAMESPACE, () => {
  const mealPlan = ref<MealPlan>({
    products: {},
  });

  const mealPlanProductsIdsList = computed(() => {
    return Object.keys(mealPlan.value?.products || {});
  });

  const getMealPlanAsync = async () => {
    mealPlan.value = await storageApi.mealPlan.getMealPlan();
  };

  const updateMealPlanAsync = async (params: storageApi.mealPlan.UpdateMealPlanParams) => {
    await storageApi.mealPlan.updateMealPlan(params);
    await getMealPlanAsync();
  };

  const updateProductInMealPlanAsync = async (product: MealPlanProduct) => {
    mealPlan.value.products = {
      ...mealPlan.value.products,
      ...product,
    };
    await updateMealPlanAsync({ mealPlan: mealPlan.value });
  };

  const deleteProductFromMealPlanAsync = async (productId: Product['id']) => {
    delete mealPlan.value.products[productId];
    await updateMealPlanAsync({ mealPlan: mealPlan.value });
  };

  return {
    mealPlan,
    mealPlanProductsIdsList,
    getMealPlanAsync,
    updateMealPlanAsync,
    updateProductInMealPlanAsync,
    deleteProductFromMealPlanAsync,
  };
});
