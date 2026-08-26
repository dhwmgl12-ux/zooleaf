import { useSignup } from '../../hooks/useAuth';
import AuthInput from './AuthInput';

export default function SignupForm() {
  const { name, email, password, passwordConfirm, errors, handleChange, handleSubmit } =
    useSignup();
  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="이름"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="이름을 입력해주세요!"
      />
      {errors.name && <p style={{ color: 'red', fontSize: '13px' }}>{errors.name}</p>}
      <AuthInput
        label="이메일"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="이메일을 입력해주세요!"
      />
      {errors.email && <p style={{ color: 'red', fontSize: '13px' }}>{errors.email}</p>}
      <AuthInput
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해주세요!"
      />
      {errors.password && <p style={{ color: 'red', fontSize: '13px' }}>{errors.password}</p>}
      <AuthInput
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={handleChange}
        placeholder="비밀번호를 다시 입력해주세요!"
      />
      {errors.passwordConfirm && (
        <p style={{ color: 'red', fontSize: '13px' }}>{errors.passwordConfirm}</p>
      )}
      <button type="submit">회원가입</button>
    </form>
  );
}
