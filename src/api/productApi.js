import { apiClient } from './client';

export async function getProducts(options = {}) {
  const params = new URLSearchParams();

  if (options.category) {
    params.append("category", options.category);
  }

  if (options.visitorType) {
    params.append("visitorType", options.visitorType);
  }

  if (options.availableTimeType) {
    params.append("availableTimeType", options.availableTimeType);
  }

  params.append("page", options.page ?? 1);
  params.append("limit", options.limit ?? 9);

  const result = await apiClient(`/products?${params.toString()}`);

  return result.data;
}

export async function getProductById(productId, signal) {
  const result = await apiClient(`/products/${productId}`, {
    signal,
  });

  return result.data;
}
