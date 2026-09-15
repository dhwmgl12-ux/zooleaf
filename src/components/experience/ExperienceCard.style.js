import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const ExperienceCardContainer = styled.article`
  position: relative;
  background: transparent;
  border-radius: ${theme.radius.image};
  border: 1px solid ${theme.colors.background2};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  min-width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-self: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    border: 1px solid ${theme.colors.secondary};
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.26);
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-bottom: ${theme.spacing[24]};
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    margin-bottom: ${theme.spacing[4]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
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
  left: ${theme.spacing[20]};
  right: ${theme.spacing[20]};
  bottom: ${theme.spacing[20]};
  width: auto;
  height: 40px;
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

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    left: ${theme.spacing[16]};
    right: ${theme.spacing[16]};
  }
`;
