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

const TERMS_TEXT = `제1조 (목적)
이 약관은 ZOOLEAF(이하 "회사")가 제공하는 동물원 이용권 예매 및 온라인 스토어 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"란 회사가 운영하는 웹사이트를 통해 입장권, 패키지, 체험 프로그램, 굿즈 등을 예매·구매할 수 있도록 제공하는 일체의 서비스를 의미합니다.
2. "회원"이란 이 약관에 동의하고 회사와 이용계약을 체결한 자를 말합니다.

제3조 (약관의 효력 및 변경)
1. 이 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.
2. 회사는 필요한 경우 관련 법령에 위배되지 않는 범위에서 이 약관을 변경할 수 있으며, 변경 시 서비스 내 공지사항을 통해 사전 안내합니다.

제4조 (회원가입)
1. 회원가입은 이용자가 약관 내용에 동의하고, 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 신청하는 방식으로 이루어집니다.
2. 회사는 가입 신청자가 다음 각 호에 해당하는 경우 승인을 제한하거나 취소할 수 있습니다.
   - 가입 신청 시 허위 내용을 기재한 경우
   - 타인의 명의를 도용하여 신청한 경우

제5조 (서비스 이용 및 제한)
1. 회원은 관계 법령, 이 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항 등을 준수하여야 합니다.
2. 회사는 회원이 서비스 이용과 관련하여 부정한 행위를 한 경우, 서비스 이용을 제한할 수 있습니다.

제6조 (면책조항)
회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우, 서비스 제공에 관한 책임이 면제됩니다.

(본 약관은 학습 프로젝트용 더미 텍스트입니다.)`;
const PRIVACY_TEXT = `1. 수집하는 개인정보 항목
회사는 회원가입, 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.
- 필수항목: 이메일(아이디), 비밀번호, 이름, 휴대폰 번호, 생년월일
- 선택항목: 마케팅 정보 수신 동의 여부

2. 개인정보의 수집 및 이용목적
- 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증
- 입장권 및 상품 예매·구매에 따른 본인 확인 및 예약 관리
- 고객 문의 대응 및 공지사항 전달

3. 개인정보의 보유 및 이용기간
회사는 회원 탈퇴 시 수집된 개인정보를 지체 없이 파기합니다. 다만 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.

4. 개인정보의 제3자 제공
회사는 원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다. 다만 법령의 규정에 의거하거나, 수사기관의 요청이 있는 경우는 예외로 합니다.

5. 동의 거부 권리 및 불이익
이용자는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만 필수항목에 대한 동의를 거부할 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.

(본 방침은 학습 프로젝트용 더미 텍스트입니다.)`;

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
          <Label>이메일 아이디</Label>
          <CheckIdRow>
            <Input
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
