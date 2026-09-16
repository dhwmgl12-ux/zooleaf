import { apiClient } from "./client";

export function getOrders() {
  return apiClient("/orders", {
    method: "GET",
  });
}
