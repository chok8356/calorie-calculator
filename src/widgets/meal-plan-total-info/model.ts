import { defineStore } from 'pinia';
import { computed } from 'vue';
import { FIRST_EXCEL_CELL_WIDTH, MIN_EXCEL_CELL_WIDTH } from './config';
import { getMealPlanExcelRow } from './lib';
import type { Product, ProductNutritionFacts } from '@/shared/api';
import { mealPlanModel } from '@/entities/meal-plan';
import { productLib, productModel } from '@/entities/product';
import { getFilenameWithDate, lodash, xlsx } from '@/shared/lib';

export const NAMESPACE = 'meal-plan-total-info';

type ProductWithAmount = Product & {
  amount: number;
};

type ProductsWithAmountList = ProductWithAmount[];

type TotalInfo = {
  nutritionFacts: ProductNutritionFacts;
  amount: ProductWithAmount['amount'];
};

export const use = defineStore(NAMESPACE, () => {
  const productStore = productModel.use();
  const mealPlanStore = mealPlanModel.use();

  const productsListWithAmount = computed<ProductsWithAmountList>(() => {
    const result: ProductsWithAmountList = [];

    for (const productId of mealPlanStore.mealPlanProductsIdsList) {
      const product: Product = lodash.cloneDeep(productStore.products[productId]);
      if (!product) continue;

      const amount = mealPlanStore.mealPlan.products[productId];

      for (const [key, value] of Object.entries(product?.nutritionFacts || {})) {
        product.nutritionFacts[key as keyof ProductNutritionFacts] = parseFloat(
          ((value / 100) * amount).toFixed(2),
        );
      }

      result.push({
        ...product,
        amount: parseFloat(amount.toFixed(2)),
      });
    }

    return result;
  });

  const totalInfo = computed<TotalInfo>(() => {
    const result: TotalInfo = {
      nutritionFacts: productLib.getEmptyProductNutritionFacts(),
      amount: 0,
    };

    for (const product of productsListWithAmount.value) {
      for (const [key, value] of Object.entries(product?.nutritionFacts || {})) {
        result.nutritionFacts[key as keyof ProductNutritionFacts] += parseFloat(value.toFixed(2));
      }
      result.amount += parseFloat(product.amount.toFixed(2));
    }

    return result;
  });

  const downloadMealPlan = () => {
    if (!productsListWithAmount.value.length) return;

    const totalRow = getMealPlanExcelRow(
      'Total',
      totalInfo.value.amount,
      totalInfo.value.nutritionFacts,
    );

    const cols = Object.keys(totalRow || {}).map((x) => ({
      wch: Math.max(x.length, MIN_EXCEL_CELL_WIDTH),
    }));
    cols.splice(0, 1, { wch: FIRST_EXCEL_CELL_WIDTH });

    const productsRowsForExcel = productsListWithAmount.value.map((x) =>
      getMealPlanExcelRow(x.name, x.amount, x.nutritionFacts),
    );

    const ws = xlsx.utils.json_to_sheet([...productsRowsForExcel, totalRow]);

    ws['!cols'] = cols;

    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Data');
    xlsx.writeFileXLSX(wb, getFilenameWithDate('meal-plan.xlsx'));
  };

  return {
    totalInfo,
    downloadMealPlan,
  };
});
