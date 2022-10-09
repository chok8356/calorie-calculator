import type { ProductNutritionFacts } from '@/shared/api';
import type { xlsx } from '@/shared/lib';
import { lodash } from '@/shared/lib';

export type MealPlanExcelRow = {
  Name: xlsx.CellObject;
  Amount: xlsx.CellObject;
  Calories: xlsx.CellObject;
  Protein: xlsx.CellObject;
  Fat: xlsx.CellObject;
  Carbohydrate: xlsx.CellObject;
};

export const getEmptyMealPlanExcelRow = (): MealPlanExcelRow => {
  return {
    Name: { v: '', t: 's' },
    Amount: { v: '', t: 's' },
    Calories: { v: '', t: 's' },
    Protein: { v: '', t: 's' },
    Fat: { v: '', t: 's' },
    Carbohydrate: { v: '', t: 's' },
  };
};

export const getMealPlanExcelRow = (
  name: string,
  amount: number,
  nutritionFacts: ProductNutritionFacts,
): MealPlanExcelRow => {
  const row = getEmptyMealPlanExcelRow();
  row.Name = { v: name, t: 's' };
  row.Amount = getNumberExcelCellContent(amount);
  for (const [key, value] of Object.entries(nutritionFacts || {})) {
    row[lodash.upperFirst(key) as keyof MealPlanExcelRow] = getNumberExcelCellContent(value);
  }
  return row;
};

export const getNumberExcelCellContent = (value: number): xlsx.CellObject => ({
  v: value.toFixed(2),
  t: 'n',
  z: '#,##0.00',
});
