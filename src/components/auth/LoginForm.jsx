import {
  ErrorText,
  Form,
  FormCard,
  Input,
  Label,
  LinkRow,
  LinkText,
  SubmitButton,
  Title,
} from './auth.styles';
import { useLogin } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const { id, password, errors, handleChange, handleSubmit } = useLogin();

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
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요!"
          />
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
        <LinkText as={Link} to="/signup">회원가입</LinkText>
      </LinkRow>
    </FormCard>
  );
}
