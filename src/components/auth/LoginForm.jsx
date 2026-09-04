import {
  ErrorText,
  Form,
  FormCard,
  InputWrapper,
  Input,
  Label,
  LinkRow,
  LinkText,
  SubmitButton,
  Title,
  ToggleButton,
} from './auth.styles';
import { useLogin } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LoginForm() {
  const { id, password, errors, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormCard>
      <Title>로그인</Title>
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
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요!"
            />
            <ToggleButton
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8456 11.3101C10.5139 11.3101 9.43457 12.3891 9.43457 13.7221C9.43457 15.0538 10.5138 16.1331 11.8456 16.1331C13.1777 16.1331 14.2576 15.0535 14.2576 13.7221C14.2576 12.3894 13.1775 11.3101 11.8456 11.3101ZM7.93457 13.7221C7.93457 11.561 9.6852 9.81006 11.8456 9.81006C14.0056 9.81006 15.7576 11.5607 15.7576 13.7221C15.7576 15.8826 14.0055 17.6331 11.8456 17.6331C9.68536 17.6331 7.93457 15.8823 7.93457 13.7221Z"
                    fill="#999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.91947 13.3995C3.97449 9.07345 7.68595 6.36843 11.8449 6.3667C11.8463 6.3667 11.8476 6.3667 11.8489 6.3667V7.8667C11.8483 7.8667 11.8476 7.8667 11.8469 7.8667C11.8463 7.8667 11.8456 7.8667 11.8449 7.8667M11.8469 7.8667C15.3016 7.86757 18.5535 10.1151 20.4195 14.0431L20.7413 14.7205L22.0962 14.0769L21.7744 13.3995C19.7193 9.07345 16.0079 6.36843 11.8489 6.3667M11.8469 7.8667C8.39225 7.86757 5.14033 10.1151 3.27437 14.0431L2.95255 14.7205L1.59766 14.0769L1.91947 13.3995"
                    fill="#999"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.07279 7.72847C4.12781 12.0545 7.83927 14.7595 11.9982 14.7612C11.9996 14.7612 12.0009 14.7612 12.0022 14.7612V13.2612C12.0016 13.2612 12.0009 13.2612 12.0002 13.2612C11.9996 13.2612 11.9989 13.2612 11.9982 13.2612M12.0002 13.2612C15.4549 13.2604 18.7068 11.0129 20.5728 7.08484L20.8946 6.40739L22.2495 7.05102L21.9277 7.72847C19.8727 12.0545 16.1612 14.7595 12.0022 14.7612M12.0002 13.2612C8.54557 13.2604 5.29365 11.0129 3.42769 7.08484L3.10587 6.40739L1.75098 7.05102L2.07279 7.72847"
                    fill="#999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.59 10.2148L21.7617 13.3866L20.7011 14.4473L17.5293 11.2755L18.59 10.2148Z"
                    fill="#999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.33094 10.2148L2.15917 13.3866L3.21983 14.4473L6.3916 11.2755L5.33094 10.2148Z"
                    fill="#999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.8439 12.7539L16.1065 17.104L14.666 17.5221L13.4033 13.172L14.8439 12.7539Z"
                    fill="#999"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.07703 12.7544L7.81439 17.1045L9.25494 17.5226L10.5176 13.1725L9.07703 12.7544Z"
                    fill="#999"
                  />
                </svg>
              )}
            </ToggleButton>
          </InputWrapper>
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </div>

        <SubmitButton type="submit">로그인</SubmitButton>
      </Form>

      <LinkRow>
        <LinkText>아이디 찾기</LinkText>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="9"
            viewBox="0 0 1 9"
            fill="none"
          >
            <path d="M0.5 0L0.5 9" stroke="#C8C9C9" />
          </svg>
        </span>
        <LinkText>비밀번호 찾기</LinkText>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="9"
            viewBox="0 0 1 9"
            fill="none"
          >
            <path d="M0.5 0L0.5 9" stroke="#C8C9C9" />
          </svg>
        </span>
        <LinkText as={Link} to="/signup">
          회원가입
        </LinkText>
      </LinkRow>
    </FormCard>
  );
}
