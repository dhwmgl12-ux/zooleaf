const API_BASE_URL = 'https://api.mylecture.kr/api/14/team2';

export async function getProducts(options = {}) {
  const params = new URLSearchParams();

  if (options.category) {
    params.append('category', options.category);
  }

  if (options.visitorType) {
    params.append('visitorType', options.visitorType);
  }

  if (options.availableTimeType) {
    params.append('availableTimeType', options.availableTimeType);
  }

  params.append('page', options.page ?? 1);
  params.append('limit', options.limit ?? 9);

  const response = await fetch(
    `${API_BASE_URL}/products?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('상품 목록을 불러오지 못했습니다.');
  }

  const result = await response.json();

  return result.data;
}