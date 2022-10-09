import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mealPlanModel } from '@/entities/meal-plan';
import { productModel } from '@/entities/product';

export const NAMESPACE = 'upload-products';

export const use = defineStore(NAMESPACE, () => {
  const router = useRouter();
  const productStore = productModel.use();
  const mealPlanStore = mealPlanModel.use();

  const replaceCreatedProducts = ref<boolean>(false);

  const uploadProductFromFile = async (value: File) => {
    try {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        async () => {
          if (reader.result) {
            if (replaceCreatedProducts.value) {
              await mealPlanStore.updateMealPlanAsync({ mealPlan: { products: {} } });
            }
            await productStore.uploadProductsAsync({
              products: JSON.parse(reader.result as string),
              replace: replaceCreatedProducts.value,
            });
            replaceCreatedProducts.value = false;
            router.push('/products');
          }
        },
        false,
      );
      reader.readAsText(value);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    replaceCreatedProducts,
    uploadProductFromFile,
  };
});
