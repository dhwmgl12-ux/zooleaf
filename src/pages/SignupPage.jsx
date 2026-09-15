import heroImagePC from '../assets/images/zooleaf-letter-pc.webp';
import heroImageDesktop from '../assets/images/zooleaf-letter-desktop.webp';
import heroImageTablet from '../assets/images/zooleaf-letter-tablet.webp';
import SignupForm from '../components/auth/SignupForm';
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
import { theme } from '../styles/variables';

export default function SignupPage() {
  return (
    <PageWrapper variant="signup">
      <PageContainer variant="signup">
        <FormSide>
          <SignupForm />
        </FormSide>

        <HeroGroup variant="signup">
          <IllustrationSide variant="signup">
            <picture>
              <source srcSet={heroImageTablet} media={`(max-width: ${theme.layout.breakpoint.tablet})`} />
              <source
                srcSet={heroImageDesktop}
                media={`(max-width: ${theme.layout.breakpoint.desktop})`}
              />
              <HeroImage src={heroImagePC} alt="자연과 동물이 숨쉬는 행복한 공간 ZOOLEAF" />
            </picture>
          </IllustrationSide>

          <TextGroup variant="signup">
            <SubText variant="signup">회원가입 하고</SubText>
            <SubTextLight variant="signup">다양한 혜택을 누리세요!</SubTextLight>
          </TextGroup>
        </HeroGroup>
      </PageContainer>
    </PageWrapper>
  );
}
