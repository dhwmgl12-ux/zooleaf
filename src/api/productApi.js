//
const BASE_URL = 'http://localhost:8080/api/v1';

/* [상품 목록 조회 API] 카테고리, 관람 대상 필터, 페이지 번호*/
export async function getProducts({ page = 1, size = 8, category = '전체상품', targets = [] } = {}) {
  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      size: String(size),
      category: category,
    });

    if (targets.length > 0) {
      queryParams.append('targets', targets.join(','));
    }

    const response = await fetch(`${BASE_URL}/products?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`[API Error] ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('상품 목록 불러오기 실패:', error);
    throw error;
  }
}