import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const ExperienceCardContainer = styled.article`
  position: relative;
  background: transparent;
  border-radius: ${theme.radius.image};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 302px;
  width: 330px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-self: center;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 310px;
    height: 300px;
    margin-bottom: ${theme.spacing[24]};
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 352px;
    height: 300px;
    margin-bottom: ${theme.spacing[4]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 100%;
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
  padding: 20px;
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
    overflow-wrap: break-word;
    width: 100%;
    max-width: 100%;
    white-space: normal;
  }

  strong {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    margin-top: ${theme.spacing[8]};
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
    width: 222px;
    height: 41px;
  }
`;
