import { create } from "zustand";

const useAuthSore = create((set) => ({
  // 상태
  isLoggedIn: false,
  user: null, // {id, name} 형태 (userInfo)


  // 로그인 성공 시 호출
  setAuth: (userInfo) =>
    set({
      isLoggedIn: true,
      user: userInfo,
    }),

    // 로그아웃 시 호출
    clearAuth: () =>
      set({
        isLoggedIn: false,
        user: null,
      }),
}))

export default useAuthSore;