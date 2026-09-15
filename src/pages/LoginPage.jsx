import heroImagePc from '../assets/images/zooleaf-letter-pc.webp';
import heroImageDesktop from '../assets/images/zooleaf-letter-desktop.webp';
import heroImageTablet from '../assets/images/zooleaf-letter-tablet.webp';
import LoginForm from '../components/auth/LoginForm';
import {
  FormSide,
  HeroGroup,
  // HeroGroup,
  HeroImage,
  IllustrationSide,
  PageContainer,
  PageWrapper,
  SubText,
  SubTextLight,
  TextGroup,
} from './AuthPage.styles';
import { theme } from '../styles/variables';

export default function LoginPage() {
  return (
    <PageWrapper>
      <PageContainer>
        <HeroGroup>
          <IllustrationSide>
            <picture>
              <source
                srcSet={heroImageTablet}
                media={`(max-width: ${theme.layout.breakpoint.tablet})`}
              />
              <source
                srcSet={heroImageDesktop}
                media={`(max-width: ${theme.layout.breakpoint.desktop})`}
              />
              <HeroImage src={heroImagePc} alt="자연과 동물이 숨쉬는 행복한 공간 ZOOLEAF" />
            </picture>
          </IllustrationSide>

          <TextGroup>
            <SubText>티켓 예매 및 조회를 위해</SubText>
            <SubTextLight>로그인 해주세요!</SubTextLight>
          </TextGroup>
        </HeroGroup>

        <FormSide>
          <LoginForm />
        </FormSide>
      </PageContainer>
    </PageWrapper>
  );
}
