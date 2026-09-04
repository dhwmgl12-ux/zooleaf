import { useSignup } from '../../hooks/useAuth';
import {
  AgreeGroup,
  AgreeLeftGroup,
  AgreeRow,
  ArrowIcon,
  ErrorText,
  Form,
  FormCard,
  InlineErrorText,
  Input,
  Label,
  SubmitButton,
  Title,
} from './auth.styles';

export default function SignupForm() {
  const {
    id,
    password,
    passwordConfirm,
    name,
    phone,
    birthDate,
    agreeTerms,
    agreePrivacy,
    agreeMarketing,
    errors,
    handleChange,
    handleSubmit,
  } = useSignup();
  return (
    <FormCard>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>이메일 아이디</Label>
          <Input
            type="email"
            name="id"
            value={id}
            onChange={handleChange}
            placeholder="user@example.com"
          />
          {errors.id && <ErrorText>{errors.id}</ErrorText>}
        </div>

        <div>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="8 ~ 20자 이상 영문 + 숫자 + 특수 문자를 포함하여 주세요."
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </div>

        <div>
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력해주세요!"
          />
          {errors.passwordConfirm && <ErrorText>{errors.passwordConfirm}</ErrorText>}
        </div>

        <div>
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="홍길동"
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </div>

        <div>
          <Label>휴대폰 번호</Label>
          <Input
            type="text"
            inputMode="numeric"
            name="phone"
            value={phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
        </div>

        <div>
          <Label>생년월일</Label>
          <Input
            type="text"
            inputMode="numeric"
            name="birthDate"
            value={birthDate}
            onChange={handleChange}
            placeholder="2000.00.00"
          />
          {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}
        </div>

        <AgreeGroup>
          <AgreeRow>
            <AgreeLeftGroup>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={handleChange}
              />
              <span>[필수] 이용약관 동의</span>
              {errors.agreeTerms && <InlineErrorText>{errors.agreeTerms}</InlineErrorText>}
            </AgreeLeftGroup>
            <ArrowIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="19"
                viewBox="0 0 8 19"
                fill="none"
              >
                <path
                  d="M0.5 18.5L7.5 8.99983L0.5 0.5"
                  stroke="#999999"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ArrowIcon>
          </AgreeRow>

          <AgreeRow>
            <AgreeLeftGroup>
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={agreePrivacy}
                onChange={handleChange}
              />
              [필수] 개인정보 수집 및 이용 동의
              {errors.agreePrivacy && <InlineErrorText>{errors.agreePrivacy}</InlineErrorText>}
            </AgreeLeftGroup>
            <ArrowIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="19"
                viewBox="0 0 8 19"
                fill="none"
              >
                <path
                  d="M0.5 18.5L7.5 8.99983L0.5 0.5"
                  stroke="#999999"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ArrowIcon>
          </AgreeRow>

          <AgreeRow>
            <AgreeLeftGroup>
              <input
                type="checkbox"
                name="agreeMarketing"
                checked={agreeMarketing}
                onChange={handleChange}
              />
              [선택] 마케팅 정보 수신 동의
            </AgreeLeftGroup>
          </AgreeRow>
        </AgreeGroup>

        <SubmitButton type="submit">가입 하기</SubmitButton>
      </Form>
    </FormCard>
  );
}
