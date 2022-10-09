import type { Product, Products } from './models';
import { apiInstance } from '@/shared/api/storage/base';

const NAMESPACE = 'products';

export const getProducts = async (): Promise<Products> => {
  return (await apiInstance.get(NAMESPACE)) || {};
};

export type UploadProductsParams = {
  products: Products;
  replace: boolean;
};

export const uploadProducts = async (params: UploadProductsParams) => {
  if (params.replace) {
    apiInstance.put(NAMESPACE, params.products);
  } else {
    const products = await getProducts();
    apiInstance.put(NAMESPACE, {
      ...products,
      ...params.products,
    });
  }
};

export type GetProductByIdParams = {
  id: Product['id'];
};

export const getProductById = async (
  params: GetProductByIdParams,
): Promise<Product | undefined> => {
  const products = await getProducts();
  return products[params.id];
};

export type UpdateProductByIdParams = {
  product: Product;
};

export const updateProductById = async (params: UpdateProductByIdParams) => {
  const products = await getProducts();
  products[params.product.id] = params.product;
  await apiInstance.put(NAMESPACE, products);
};

export type DeleteProductById = {
  id: Product['id'];
};

export const deleteProductById = async (params: DeleteProductById) => {
  const products = await getProducts();
  delete products[params.id];
  await apiInstance.put(NAMESPACE, products);
};

export type CreateProductParams = {
  product: Product;
};

export const createProduct = async (params: CreateProductParams) => {
  const products = await getProducts();
  products[params.product.id] = params.product;
  await apiInstance.put(NAMESPACE, products);
};
