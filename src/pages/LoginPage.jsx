import heroImage  from '../assets/images/zooleaf-letter-pc.webp'
import LoginForm from '../components/auth/LoginForm'
import { FormSide, HeroGroup, HeroImage, IllustrationSide, PageContainer, PageWrapper, SubText, SubTextLight, TextGroup } from './LoginPage.styles'

export default function LoginPage() {

  return (
    <PageWrapper> 
      <PageContainer>
        <IllustrationSide>
          <HeroGroup>
            <HeroImage src={heroImage} alt='자연과 동물이 숨쉬는 행복한 공간 ZOOLEAF'/>
            <TextGroup>
              <SubText>티켓 예매 및 조회를 위해</SubText>
              <SubTextLight>로그인 해주세요!</SubTextLight>
            </TextGroup>
          </HeroGroup>
        </IllustrationSide>
        <FormSide>
          <LoginForm/>
        </FormSide>
      </PageContainer>
    </PageWrapper>
  )
}              
