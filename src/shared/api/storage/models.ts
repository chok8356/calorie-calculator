export type Product = {
  id: string;
  name: string;
  description: string;
  nutritionFacts: ProductNutritionFacts;
};

export type ProductNutritionFacts = {
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
};

export type Products = Record<Product['id'], Product>;

export type MealPlan = {
  products: MealPlanProduct;
};

export type MealPlanProduct = Record<Product['id'], number>;
