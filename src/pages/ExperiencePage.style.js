import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const ExperiencePageWrapper = styled.div`
  background-color: ${theme.colors.background2};
  padding-bottom: ${theme.spacing[64]};
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
  margin-top: ${theme.spacing[32]};
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin-bottom: ${theme.spacing[64]};
    font-size: ${theme.fontSize.h4.size};
  }
`;

export const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing[24]};
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    margin-left: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    grid-template-columns: 100%;
    margin: 0;
  }
`;

export const ExperienceCard = styled.article`
  position: relative;
  background: transparent;
  border-radius: ${theme.radius.image};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 302px;
  width: 100%;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  justify-self: center;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 310px;
    height: 300px;
    margin-bottom: ${theme.spacing[24]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 352px;
    height: 300px;
    margin-bottom: ${theme.spacing[4]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 100%;
    height: 262px;
    margin-bottom: ${theme.spacing[24]};
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
    display: block;
  }
`;

export const CardOverlayText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${theme.spacing[20]};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  text-align: right;
  z-index: 2;

  h2 {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    margin: 0;
    line-height: 1.4;
    word-break: keep-all;
    width: 100%;
  }

  strong {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    margin-top: ${theme.spacing[8]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    h2 {
      font-size: ${theme.fontSize.h5.size};
      font-weight: ${theme.fontWeight.bold};
      margin: 0;
      word-break: keep-all;
      overflow-wrap: break-word;
      width: 100%;
      max-width: 100%;
      white-space: normal;
    }
  }
`;

export const ReserveButton = styled.a`
  position: absolute;
  bottom: ${theme.spacing[20]};
  left: 50%;
  transform: translateX(-50%);
  width: 86%;
  max-width: 286px;
  height: 41px;
  text-align: center;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.radius.button};
  font-size: ${theme.fontSize.bodylarge.size};
  font-weight: ${theme.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  &:hover {
    background-color: ${theme.colors.hover};
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 86%;
    max-width: 268px;
    height: 41px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 88%;
    max-width: 310px;
    height: 41px;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 84%;
    max-width: 222px;
    height: 41px;
  }
`;
