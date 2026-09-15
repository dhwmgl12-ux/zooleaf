import styled from "@emotion/styled";
import { theme } from "../../styles/variables";
import { keyframes } from "@emotion/react";

export const DesktopMap = styled.section`
  position: relative;
  width: min(100%, 1100px);

  @media screen and (max-width: 1024px) {
    display: none;
  }
`

export const MapImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

export const MapHotspot = styled.button`
  position: absolute;

  top: ${({ $position }) => $position.top};
  left: ${({ $position }) => $position.left};
  width: ${({ $position }) => $position.width};
  height: ${({ $position }) => $position.height};

  display: block;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;

    pointer-events: none;
    transition: filter 0.3s ease, transform 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    z-index: 1;
    filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.8));
  }

  &:hover img,
  &:focus-visible img {
    filter: brightness(1.05);
    transform: scale(1.02);
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ZoneCard = styled.article`
  position: absolute;
  bottom: ${theme.spacing[24]};
  left: ${theme.spacing[24]};
  z-index: 2;

  width: min(45%, 480px);
  padding: ${theme.spacing[32]};

  border-radius: ${theme.radius.box};
  background-color: ${theme.colors.white};
  box-shadow: 0 8px 20px rgb(44 62 53 / 20%);

  animation: ${slideUp} 0.3s ease-out both;

  h3 {
    display: flex;
    align-items: baseline;
    gap: ${theme.spacing[8]};

    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    
  }
  
  h3 span {
    font-size: ${theme.fontSize.h6.size};
    line-height: ${theme.fontSize.h6.lineheight};
    font-weight: ${theme.fontWeight.semiBold};
  }
`

export const AnimalList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${theme.spacing[16]};
  margin-top: ${theme.spacing[24]};

  li {
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing[8]};
    text-align: center;
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
  }
`

export const MobilePopularAnimals = styled.div`
  display: none;
  width: 100%;

  @media screen and (max-width: 1024px) {
    display: block;
  }

  h3 {
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    text-align: center;
  }

  h3 span {
    margin-left: ${theme.spacing[8]};
    font-size: ${theme.fontSize.h6.size};
    line-height: ${theme.fontSize.h6.lineheight};
    font-weight: ${theme.fontWeight.semiBold};
  }

  > ul {
    width: min(100%, 700px);
    margin-inline: auto;
    margin-top: ${theme.spacing[32]};
    row-gap: ${theme.spacing[32]};
  }

  span {
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    h3 {
      font-size: ${theme.fontSize.h4.size};
      line-height: ${theme.fontSize.h4.lineheight};
    }

    > ul {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: ${theme.spacing[12]};
    }

    > ul > li:nth-of-type(n + 5) {
      display: none;
    }
  }

  @media screen and (max-width: ${theme.layout.breakpoint.smallMobile}) {
    > ul {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`
