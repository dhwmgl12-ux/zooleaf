import { apiClient } from './client';
import { AUTH_ENDPOINTS } from './endpoints';

export function checkId(id) {
  return apiClient(AUTH_ENDPOINTS.CHECK_ID, {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export function signup(payload) {
  return apiClient(AUTH_ENDPOINTS.SIGNUP, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 로그인

export function login({ id, password }) {
  return apiClient(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify({ id, password }),
  });
}

export function logout() {
  return apiClient(AUTH_ENDPOINTS.LOGOUT, {
    method: 'POST',
  });
}

export function getMe() {
  return apiClient(AUTH_ENDPOINTS.ME, {
    method: 'GET',
  });
}
