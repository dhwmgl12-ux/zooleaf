import { apiClient } from "./client";

// 장바구니 목록 조회
export const getCart = () => apiClient("/cart");

// 장바구니에 상품 추가
export const addCart = (item) =>
  apiClient("/cart", {
    method: "POST",
    body: JSON.stringify(item),
  });

// 특정 장바구니 상품의 수량 수정
export const updateCartQuantity = (id, quantity) =>
  apiClient(`/cart/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

// 특정 장바구니 상품 삭제
export const deleteCartItem = (id) =>
  apiClient(`/cart/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

// 선택한 장바구니 상품들 삭제
export const deleteSelectedCartItems = (cartItemIds) =>
  apiClient("/cart", {
    method: "DELETE",
    body: JSON.stringify({ cartItemIds }),
  });

// 장바구니 전체 상품 삭제
export const deleteAllCartItems = () =>
  apiClient("/cart", {
    method: "DELETE",
  });
