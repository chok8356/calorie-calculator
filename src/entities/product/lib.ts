import type { Product, ProductNutritionFacts } from '@/shared/api';
import { generateId } from '@/shared/lib';

export const getEmptyProduct = (): Product => {
  return {
    id: generateId(),
    name: '',
    description: '',
    nutritionFacts: getEmptyProductNutritionFacts(),
  };
};

export const getEmptyProductNutritionFacts = (): ProductNutritionFacts => {
  return {
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
  };
};
