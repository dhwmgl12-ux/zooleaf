import useAuthStore from "../store/authStore"


export default function MyPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <h1>마이페이지</h1>
      <p>{user?.name}님 환영합니다.</p>
    </div>
  )
}
