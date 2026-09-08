import SignupForm from '../components/auth/SignupForm';
import heroImage from '../assets/images/zooleaf-letter-pc.webp';
import {
  FormSide,
  HeroGroup,
  HeroImage,
  IllustrationSide,
  PageContainer,
  PageWrapper,
  SubText,
  SubTextLight,
  TextGroup,
} from './AuthPage.styles';

export default function SignupPage() {
  return (
    <PageWrapper variant="signup">
      <PageContainer>
        <FormSide>
          <SignupForm />
        </FormSide>
        <IllustrationSide variant="signup">
          <HeroGroup variant="signup">
            <HeroImage src={heroImage} alt="자연과 동물이 숨쉬는 행복한 공간 ZOOLEAF" />
            <TextGroup variant="signup">
              <SubText variant="signup">회원가입 하고</SubText>
              <SubTextLight variant="signup">다양한 혜택을 누리세요!</SubTextLight>
            </TextGroup>
          </HeroGroup>
        </IllustrationSide>
      </PageContainer>
    </PageWrapper>
  );
}
