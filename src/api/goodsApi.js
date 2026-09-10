import { apiClient } from './client';

export async function getGoods(options = {}) {
  const params = new URLSearchParams();

  if (options.subCategory && options.subCategory !== '전체상품') {
    params.append('subCategory', options.subCategory);
  }

  params.append('page', options.page ?? 1);
  params.append('limit', options.limit ?? 9);

  const result = await apiClient(`/goods?${params.toString()}`, {
    signal: options.signal,
  });

  return result.data;
}
