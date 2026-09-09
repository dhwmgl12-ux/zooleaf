const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 세션스토리지에 저장된 로그인 토큰 가져오기
async function request(endpoint, method = "GET", body) {
  const token = sessionStorage.getItem("token");

  // 서버에 API 요청 보내기
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    // GET, POST, PATCH, DELETE 같은 요청 방식
    method,

    // 서버에 같이 보낼 헤더 정보
    headers: {
      "Content-Type": "application/json",

      // body가 있을 때만 JSON 문자열로 변환해서 서버에 전달
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  // 응답 상태가 204면 응답 내용이 없으므로 성공 객체 직접 생성
  // 204가 아니면 서버가 보낸 JSON 데이터를 읽음
  const data =
    response.status === 204 ? { success: true } : await response.json();

  // HTTP 요청 실패 또는 서버에서 success: false를 보낸 경우 에러 발생
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "요청에 실패했습니다.");
  }

  // 정상적으로 받은 데이터를 반환
  return data;
}
// 장바구니 목록 조회
export const getCart = () => request("/cart");

// 장바구니에 상품 추가
export const addCart = (item) => request("/cart", "POST", item);

// 특정 장바구니 상품의 수량 수정
export const updateCartQuantity = (id, quantity) =>
  request(`/cart/${encodeURIComponent(id)}`, "PATCH", { quantity });

// 특정 장바구니 상품 삭제
export const deleteCartItem = (id) =>
  request(`/cart/${encodeURIComponent(id)}`, "DELETE");

// 선택한 장바구니 상품들 삭제
export const deleteAllCartItems = () => request("/cart", "DELETE");
