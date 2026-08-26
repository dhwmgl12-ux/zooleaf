import AuthInput from './AuthInput'
import { useLogin } from "../../hooks/useAuth";

export default function LoginForm() {
  const { email, password, errors, handleChange, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="이메일"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="이메일을 입력해주세요!"
        />
        {errors.email && <p style={{ color: 'red', fontSize: '13px'}}>{errors.email}</p>}
      <AuthInput
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해주세요!"
        />
        {errors.password && <p style={{ color: 'red', fontSize: '13px'}}>{errors.password}</p>}

        <button type='submit'>로그인</button>
    </form>
  )
}