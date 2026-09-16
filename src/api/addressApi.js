import { apiClient } from "./client";

export function getAddresses() {
  return apiClient("/addresses", {
    method: "GET",
  });
}

export function createAddress(payload) {
  return apiClient("/addresses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAddress(addressId, payload) {
  return apiClient(`/addresses/${encodeURIComponent(addressId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteAddress(addressId) {
  return apiClient(`/addresses/${encodeURIComponent(addressId)}`, {
    method: "DELETE",
  });
}
