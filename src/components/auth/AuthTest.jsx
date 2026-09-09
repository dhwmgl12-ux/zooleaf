import useAuthStore from "../../store/authStore";

const AuthTest = () => {
  const { isLoggedIn, user, clearAuth } = useAuthStore();
  return (
    <div style={{padding: "40px"}}>
      <h2>인증 상태 테스트 페이지</h2>
      <p>로그인 여부: {isLoggedIn ? "로그인 상태" : "로그아웃 상태"}</p>
      <p>유저 정보: {user ? JSON.stringify(user) : "없음"}</p>

      {isLoggedIn && (
        <button type="button" onClick={clearAuth}>
          로그아웃 테스트
        </button>
      )}
    </div>
  )
}

export default AuthTest;

