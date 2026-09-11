import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const ExperiencePageWrapper = styled.div`
  background-color: ${theme.colors.background2};
  padding-bottom: 60px;
`;

export const ExperienceMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const ExperienceTitle = styled.h2`
  text-align: center;
  font-size: ${theme.fontSize.h3.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[100]};
  margin-top: ${theme.spacing[100]};
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin-bottom: ${theme.spacing[64]};
  }
`;

export const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    margin-left: -${theme.spacing[20]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    grid-template-columns: 300px;
    margin-left: -${theme.spacing[8]};
  }
`;

export const ExperienceCard = styled.article`
  position: relative;
  background: transparent;
  border-radius: ${theme.radius.image};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 302px;
  width: 330px;
  display: flex;
  flex-direction: column;
  /* overflow를 여기에 주어 카드 전체의 모서리를 깔끔하게 마스킹합니다 */
  overflow: hidden;
  justify-self: center;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 310px;
    height: 300px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 352px;
    height: 300px;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 343px;
    height: 300px;
  }
`;

export const CardImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; /* 이미지 하단에 미세한 여백이 생기는 현상 방지 */
  }
`;

export const CardOverlayText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  box-sizing: border-box;
  text-align: right;
  z-index: 2;

  h2 {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    margin: 0;
    line-height: 1.4;
    word-break: keep-all;
    width: 55%;
    @media (max-width: 480px) {
      max-width: none;
      white-space: nowrap;
    }
  }

  strong {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    margin-top: ${theme.spacing[8]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    h2 {
      width: 100%;
    }
  }
`;

export const ReserveButton = styled.a`
  position: absolute;
  bottom: ${theme.spacing[20]};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 286px;
  height: 41px;
  text-align: center;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.radius.button};
  font-size: ${theme.fontSize.bodylarge.size};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  &:hover {
    background-color: ${theme.colors.hover};
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 268px;
    height: 41px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 310px;
    height: 41px;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 301px;
    height: 41px;
  }
`;

export const StatusText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #555;
  margin-top: 50px;
`;

export { theme };
