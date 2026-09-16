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
