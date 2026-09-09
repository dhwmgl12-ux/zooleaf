const API_BASE_URL = 'https://api.mylecture.kr/api/14/team2';

export async function getGoods(options = {}) {
  const params = new URLSearchParams();

  if (options.subCategory && options.subCategory !== '전체상품') {
    params.append('subCategory', options.subCategory);
  }

  params.append('page', options.page ?? 1);
  params.append('limit', options.limit ?? 9);

  const response = await fetch(
    `${API_BASE_URL}/goods?${params.toString()}`,
    { signal: options.signal }
  );

  if (!response.ok) {
    throw new Error('굿즈 목록을 불러오지 못했습니다.');
  }

  const result = await response.json();

  return result.data;
}
