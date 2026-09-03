import AuthInput from './AuthInput'
import { useLogin } from "../../hooks/useAuth";

export default function LoginForm() {
  const { id, password, errors, handleChange, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="이메일 아이디"
        type="email"
        name="id"
        value={id}
        onChange={handleChange}
        placeholder="user@example.com"
        />
        {errors.id && <p classNames='error-text'>{errors.id}</p>}
      <AuthInput
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해주세요!"
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}

        <button type='submit'>로그인</button>
    </form>
  )
}