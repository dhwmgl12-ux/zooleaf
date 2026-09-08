const BASE_URL = "https://api.mylecture.kr/api/14/team2";

// 로그인 토큰 가져오기
const getToken = () => {
  return localStorage.getItem("token");
};

// 공통 Header
const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// 장바구니 조회
export const getCart = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();

  return data;
};

// 장바구니 담기
export const addCart = async (cartItem) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(cartItem),
  });

  const data = await response.json();

  return data;
};

// 장바구니 수량 변경
export const updateCartQuantity = async (cartItemId, quantity) => {
  const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      quantity,
    }),
  });

  const data = await response.json();

  return data;
};

// 장바구니 개별 삭제
export const deleteCartItem = async (cartItemId) => {
  const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();

  return data;
};

// 장바구니 선택 삭제
export const deleteSelectedCartItems = async (cartItemIds) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({
      cartItemIds,
    }),
  });

  const data = await response.json();

  return data;
};

// 장바구니 전체 삭제
export const deleteAllCartItems = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();

  return data;
};
