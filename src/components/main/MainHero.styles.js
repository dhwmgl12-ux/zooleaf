import styled from '@emotion/styled';
import {theme} from '../../styles/variables'
import { Link } from "react-router-dom";

export const MainHeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 900px;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  .hero-video {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    aspect-ratio: 3 / 4;
  }
`

export const MainHeroMoreLink = styled(Link)`
  padding: ${theme.spacing[12]} ${theme.spacing[24]};
  border-radius: ${theme.radius.button};
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
  font-size: ${theme.fontSize.button.size};
  font-weight: ${theme.fontWeight.medium};
  transition: color 0.2s ease, background-color 0.2s ease;
  text-align: center;
  min-width: 20%;

  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.hover};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.hover};
    outline-offset: 3px;
  }
`


export const MainHeroContent = styled.div`
  position: absolute;
  z-index: 1;
  top: 20%;
  left: 15%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${theme.spacing[24]};

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    top: 18%;
    left: 6%;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    top: 20%;
    left: 8%;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    left: 50%;
    transform: translateX(-50%);

    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
`

export const MainHeroTitle = styled.div`
  width: fit-content;
  max-width: 100%;

  display: flex;
  flex-direction:column;

  font-family: "Wave", "Pretendard", sans-serif;
  font-weight: 500;
  font-size: ${theme.spacing[56]};

  div {
    display: flex;
    align-items: flex-end;
    gap: ${theme.spacing[8]};
    
    img {
      width: min(100%, 360px);
      height: auto;
    }
  }
  
  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    font-size: ${theme.spacing[32]};
    
    div {
      img {
        width: min(100%, 300px);
        height: auto;
      }
    }
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    font-size: ${theme.spacing[24]};
    
    div {
      gap: ${theme.spacing[4]};

      img {
        width: min(100%, 240px);
        height: auto;
      }
    }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    align-items: center;
    div {
      justify-content: center;

      img {
        width: min(100%, 180px);
        height: auto;
      }
    }
  }
`