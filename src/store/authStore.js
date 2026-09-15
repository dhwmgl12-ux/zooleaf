import { create } from "zustand";

const useAuthStore = create((set) => ({
  // 상태
  isLoggedIn: !!sessionStorage.getItem("token"),
  user: null, // {id, name} 형태 (userInfo)
  token: sessionStorage.getItem("token") || null,
  isAuthReady: false,

  // 로그인 성공 시 호출
  setAuth: (token, userInfo) => {
    sessionStorage.setItem("token", token);
    set({
      isLoggedIn: true,
      user: userInfo,
      token,
      isAuthReady: true,
    });
  },
    // 로그아웃 시 호출
    clearAuth: () => {
      sessionStorage.removeItem("token");
      set({
        isLoggedIn: false,
        user: null,
        token: null,
        isAuthReady: true
      });
    },
}))

export default useAuthStore;