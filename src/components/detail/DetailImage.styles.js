import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const DetailImageContainer = styled.div`
  width: 100%;
`

export const MainImageViewport = styled.div`
  width: 100%;
  aspect-ratio: 828 / 540;
  
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radius.image};
  background-color: ${theme.colors.background2};
  
  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    width: min(100%, 480px);
    aspect-ratio: 480 / 320;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 100%;
    aspect-ratio: 480 / 320;
  }
`

export const ImageTrack = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;

  transform: ${({ $currentIndex }) => `translateX(-${$currentIndex * 100}%)`};

  transition: transform 300ms ease;

  > li {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;

  width: 56px;
  height: 56px;

  display: grid;
  place-items: center;

  border-radius: 50%;
  background-color: rgb(255 255 255 / 80%);


  &.prev-btn {
    left: ${theme.spacing[4]};
  }

  &.next-btn {
    right: ${theme.spacing[4]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${theme.colors.background2};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 40px;
    height: 40px;
  }
`

export const ThumbnailList = styled.ul`
  width: 100%;
  margin-top: ${theme.spacing[16]};

  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[8]};

  overflow-x: auto;

  li {
    flex: 0 0 auto;
  }

  button {
    width: 80px;
    aspect-ratio: 1 / 1;
    
    overflow: hidden;
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: ${theme.colors.white};
  }

  button[aria-current="true"] {
    border-color: ${theme.colors.primary};
  }

  button:hover {
    border-color: ${theme.colors.border};
  }

  button[aria-current="true"]:hover {
    border-color: ${theme.colors.primary};
  }

  button:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    button {
      width: 100px;
    }
  }

  @media (max-width: 600px) {
    button {
      width: 80px;
    }
  }

  @media (max-width: 475px) {
    button {
      width: 60px;
    }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    button {
      width: 50px;
    }
  }
`