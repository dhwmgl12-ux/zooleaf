import { useState } from 'react';
import { useSignup } from '../../hooks/useAuth';
import {
  AgreeGroup,
  AgreeLeftGroup,
  AgreeRow,
  ArrowIcon,
  BottomLink,
  BottomLinkRow,
  Checkbox,
  CheckIdButton,
  CheckIdRow,
  ErrorText,
  Form,
  FormCard,
  InlineErrorText,
  Input,
  Label,
  SubmitButton,
  SuccessText,
  Title,
} from './auth.styles';
import Modal from '../common/Modal';
import PasswordField from './PasswordField';
import { TERMS_TEXT, PRIVACY_TEXT } from '../../constants/legalText';


export default function SignupForm() {
  const {
    id,
    idCheckStatus,
    idCheckMessage,
    password,
    passwordConfirm,
    name,
    phone,
    birthDate,
    agreeTerms,
    agreePrivacy,
    agreeMarketing,
    isSubmitting,
    errors,
    handleChange,
    handleCheckId,
    handleSubmit,
  } = useSignup();

  const [openModal, setOpenModal] = useState(null);

  return (
    <FormCard variant="signup">
      <Title>회원가입</Title>
      {errors.form && <ErrorText>{errors.form}</ErrorText>}
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='id'>이메일 아이디</Label>
          <CheckIdRow>
            <Input
              id='id'
              type="email"
              name="id"
              autoComplete="username"
              value={id}
              onChange={handleChange}
              placeholder="user@example.com"
            />
            <CheckIdButton
              type="button"
              onClick={handleCheckId}
              disabled={idCheckStatus === 'checking'}
            >
              중복확인
            </CheckIdButton>
          </CheckIdRow>
          {errors.id && <ErrorText>{errors.id}</ErrorText>}
          {idCheckStatus === 'available' && <SuccessText>{idCheckMessage}</SuccessText>}
        </div>

        <PasswordField
          label='비밀번호'
          name='password'
          value={password}
          onChange={handleChange}
          autoComplete='new-password'
          placeholder='8 ~ 20자 이상 영문 + 숫자 + 특수문자를 포함하여 주세요.'
          error={errors.password}
        />

        <PasswordField
          label='비밀번호'
          name='passwordConfirm'
          value={passwordConfirm}
          onChange={handleChange}
          autoComplete='new-password'
          placeholder='비밀번호를 다시 입력해주세요.'
          error={errors.passwordConfirm}
        />

        <div>
          <Label htmlFor='name'>이름</Label>
          <Input
            id='name'
            type="text"
            name="name"
            autoComplete='name'
            value={name}
            onChange={handleChange}
            placeholder="홍길동"
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </div>

        <div>
          <Label htmlFor='phone'>휴대폰 번호</Label>
          <Input
            id='phone'
            type="text"
            inputMode="numeric"
            name="phone"
            autoComplete='tel'
            value={phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
        </div>

        <div>
          <Label htmlFor='birthDate'>생년월일</Label>
          <Input
            id='birthDate'
            type="text"
            inputMode="numeric"
            name="birthDate"
            autoComplete='off'
            value={birthDate}
            onChange={handleChange}
            placeholder="2000.00.00"
          />
          {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}
        </div>

        <AgreeGroup>
          <AgreeRow>
            <AgreeLeftGroup>
              <Checkbox
                type="checkbox"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={handleChange}
              />
              <span>[필수] 이용약관 동의</span>
              {errors.agreeTerms && <InlineErrorText>{errors.agreeTerms}</InlineErrorText>}
            </AgreeLeftGroup>
            <ArrowIcon
              type="button"
              onClick={() => setOpenModal('terms')}
              aria-label="약관 전체보기"
            >
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ArrowIcon>
          </AgreeRow>

          <AgreeRow>
            <AgreeLeftGroup>
              <Checkbox
                type="checkbox"
                name="agreePrivacy"
                checked={agreePrivacy}
                onChange={handleChange}
              />
              [필수] 개인정보 수집 및 이용 동의
              {errors.agreePrivacy && <InlineErrorText>{errors.agreePrivacy}</InlineErrorText>}
            </AgreeLeftGroup>
            <ArrowIcon
              type="button"
              onClick={() => setOpenModal('privacy')}
              aria-label="개인정보 수집 및 이용 전체 보기"
            >
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ArrowIcon>
          </AgreeRow>

          <AgreeRow>
            <AgreeLeftGroup>
              <Checkbox
                type="checkbox"
                name="agreeMarketing"
                checked={agreeMarketing}
                onChange={handleChange}
              />
              [선택] 마케팅 정보 수신 동의
            </AgreeLeftGroup>
          </AgreeRow>
        </AgreeGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '가입 처리 중...' : '가입 하기'}
        </SubmitButton>
      </Form>
      <BottomLinkRow>
        이미 회원이신가요? <BottomLink to="/login">로그인하러 가기</BottomLink>
      </BottomLinkRow>

      <Modal isOpen={openModal === 'terms'} onClose={() => setOpenModal(null)} title="이용약관">
        {TERMS_TEXT}
      </Modal>

      <Modal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title="개인정보 수집 및 이용 동의"
      >
        {PRIVACY_TEXT}
      </Modal>
    </FormCard>
  );
}
