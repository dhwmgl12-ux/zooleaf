const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiClient(endpoint, options = {}) {
  const token = sessionStorage.getItem('token');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}`}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "요청에 실패했습니다.");
  }
   return data;
}