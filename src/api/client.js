import { AUTH_ENDPOINTS } from "./endpoints";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PUBLIC_ENDPOINTS = [AUTH_ENDPOINTS.LOGIN, AUTH_ENDPOINTS.SIGNUP, AUTH_ENDPOINTS.CHECK_ID];

export async function apiClient(endpoint, options = {}) {
  const isPublic = PUBLIC_ENDPOINTS.includes(endpoint);
  const token = !isPublic ? sessionStorage.getItem("token") : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    const error = new Error(
      data.message || "요청에 실패했습니다."
    );

    error.status = response.status;
    error.code = data.code;

    throw error;
  }
  
  return data;
}
