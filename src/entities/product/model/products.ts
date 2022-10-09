import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getEmptyProduct } from '../lib';
import type { Product, Products } from '@/shared/api';
import { storageApi } from '@/shared/api';
import { downloadJson, lodash } from '@/shared/lib';

export const NAMESPACE = 'products';

export const use = defineStore(NAMESPACE, () => {
  const products = ref<Products>({});

  const productsList = computed<Product[]>(() => {
    return lodash.orderBy(Object.values(products.value || {}), ['name'], ['asc']);
  });

  const getProductsAsync = async () => {
    products.value = await storageApi.products.getProducts();
  };

  const uploadProductsAsync = async (params: storageApi.products.UploadProductsParams) => {
    await storageApi.products.uploadProducts(params);
    await getProductsAsync();
  };

  const downloadProductsAsync = async () => {
    await getProductsAsync();
    downloadJson(products.value, 'products');
  };

  const getProductByIdAsync = async (params: storageApi.products.GetProductByIdParams) => {
    return await storageApi.products.getProductById(params);
  };

  const updateProductByIdAsync = async (params: storageApi.products.UpdateProductByIdParams) => {
    await storageApi.products.updateProductById(params);
    await getProductsAsync();
  };

  const deleteProductByIdAsync = async (params: storageApi.products.DeleteProductById) => {
    await storageApi.products.deleteProductById(params);
    await getProductsAsync();
  };

  const createProductAsync = async (params: storageApi.products.CreateProductParams) => {
    await storageApi.products.createProduct(params);
    await getProductsAsync();
  };

  // Form
  const editing = ref(false);

  const productForForm = ref<Product>(getEmptyProduct());

  const setProductForForm = async (product: Product) => {
    productForForm.value = product;
  };

  const setEditing = async (value: boolean) => {
    editing.value = value;
  };

  // Filter
  const query = ref<string>('');

  const filteredList = computed(() => {
    if (!query.value) return productsList.value;
    return productsList.value.filter((x) =>
      x.name.toLowerCase().includes(query.value.toLowerCase()),
    );
  });

  const setQuery = async (value: string) => {
    query.value = value;
  };

  return {
    products,
    productsList,
    getProductsAsync,
    uploadProductsAsync,
    downloadProductsAsync,
    getProductByIdAsync,
    updateProductByIdAsync,
    deleteProductByIdAsync,
    createProductAsync,
    // Form
    editing,
    productForForm,
    setProductForForm,
    setEditing,
    // Filter
    query,
    filteredList,
    setQuery,
  };
});
