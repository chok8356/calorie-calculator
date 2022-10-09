import type { MealPlan } from '@/shared/api';
import { apiInstance } from '@/shared/api/storage/base';

const NAMESPACE = 'mealPlan';

export const getMealPlan = async (): Promise<MealPlan> => {
  return (await apiInstance.get(NAMESPACE)) || {};
};

export type UpdateMealPlanParams = {
  mealPlan: MealPlan;
};

export const updateMealPlan = async (params: UpdateMealPlanParams) => {
  await apiInstance.put(NAMESPACE, params.mealPlan);
};
