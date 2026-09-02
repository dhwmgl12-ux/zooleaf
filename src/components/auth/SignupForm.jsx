import { useSignup } from '../../hooks/useAuth';
import AuthInput from './AuthInput';

export default function SignupForm() {
  const { id, password, passwordConfirm, name, phone, birthDate, agreeTerms, agreePrivacy, agreeMarketing, errors, handleChange, handleSubmit } = useSignup();
  return (
    <form onSubmit={handleSubmit}>
      <AuthInput
        label="이메일"
        type="email"
        name="id"
        value={id}
        onChange={handleChange}
        placeholder="user@example.com"
      />
      {errors.id && <p className="error-text">{errors.id}</p>}

      <AuthInput
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="8 ~ 20자 이상 영문 + 숫자 + 특수 문자를 포함하여 주세요."
      />
      {errors.password && <p className="error-text">{errors.password}</p>}

      <AuthInput
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={handleChange}
        placeholder="비밀번호를 다시 입력해주세요!"
      />
      {errors.passwordConfirm && (<p className="error-text">{errors.passwordConfirm}</p>)}

      <AuthInput
        label="이름"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="홍길동"
      />
      {errors.name && <p className="error-text">{errors.name}</p>}

      <AuthInput
        label="휴대폰 번호"
        type="text"
        name="phone"
        value={phone}
        onChange={handleChange}
        placeholder="010-0000-0000"
      />
      {errors.phone && <p className="error-text">{errors.phone}</p>}

      <AuthInput
        label="생년월일"
        type="text"
        name="birthDate"
        value={birthDate}
        onChange={handleChange}
        placeholder="2000.00.00"
      />
      {errors.birthDate && <p className="error-text">{errors.birthDate}</p>}

      <label>
        <input type="checkbox" name="agreeTerms" checked={agreeTerms} onChange={handleChange} />
        [필수] 이용약관 동의
      </label>
      {errors.agreeTerms && (<p className="error-text">{errors.agreeTerms}</p>)}

      <label>
        <input type="checkbox" name="agreePrivacy" checked={agreePrivacy} onChange={handleChange} />
        [필수] 개인정보 수집 및 이용 동의
      </label>
      {errors.agreePrivacy && (<p className="error-text">{errors.agreePrivacy}</p>)}

      <label>
        <input type="checkbox" name="agreeMarketing" checked={agreeMarketing} onChange={handleChange} />
        [선택] 마케팅 정보 수신 동의
      </label>

      <button type="submit">가입 하기</button>
    </form>
  );
}
