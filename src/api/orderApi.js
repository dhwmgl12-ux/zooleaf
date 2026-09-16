import { apiClient } from "./client";

export function getOrders() {
  return apiClient("/orders", {
    method: "GET",
  });
}

// 주문 전체 취소
export function cancelOrderRequest(orderId) {
  return apiClient(`/orders/${encodeURIComponent(orderId)}/cancel`, {
    method: "POST",
  });
}

// 장바구니 선택 상품으로 주문 저장
export function createOrder({ requestId, cartItemIds, addressId, benefitId }) {
  return apiClient("/orders", {
    method: "POST",
    body: JSON.stringify({
      requestId,
      cartItemIds,
      addressId,
      benefitId,
    }),
  });
}
