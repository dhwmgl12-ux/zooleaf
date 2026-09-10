import {
  ErrorText,
  Form,
  FormCard,
  Input,
  Label,
  LinkRow,
  LinkText,
  FormErrorText,
  SubmitButton,
  Title,
} from "./auth.styles";
import { useLogin } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const { id, password, errors, isSubmitting, handleChange, handleSubmit } = useLogin();

  return (
    <FormCard>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>이메일 아이디</Label>
          <Input
            type="email"
            name="id"
            autoComplete="username"
            value={id}
            onChange={handleChange}
            placeholder="user@example.com"
          />
          {errors.id && <ErrorText>{errors.id}</ErrorText>}
        </div>
        <PasswordField
          label='비밀번호'
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete='current-password'
          placeholder="비밀번호를 입력해주세요!"
          error={errors.password}
        />
        {errors.form && <FormErrorText>{errors.form}</FormErrorText>}
        <SubmitButton type="submit" disabled={isSubmitting}>{isSubmitting ? '로그인 중' : '로그인'}</SubmitButton>
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
