import styled from "@emotion/styled";
import { theme } from "../styles/variables";

export const Container = styled.section`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 440px;
  gap: ${theme.spacing[16]};
  padding: ${theme.spacing[40]} 0;
  text-align: center;
  word-break: keep-all;

  img {
    position: absolute;
    top: 60%;
    left: 50%;
    z-index: 0;
    width: 400px;
    max-width: 90%;
    height: auto;
    transform: translate(-50%, -50%);

    pointer-events: none;
  }

  > h1,
  > p,
  > a {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 0;
    line-height: 1;

    &::before {
      content: "404";
      display: block;
      margin-bottom: ${theme.spacing[16]};
      color: ${theme.colors.primary};
      font-size: clamp(96px, 12vw, 144px);
      font-weight: 800;
      letter-spacing: 0.02em;
    }

    &::after {
      content: "페이지를 찾을 수 없습니다.";
      display: block;
      color: ${theme.colors.textPrimary};
      font-size: ${theme.fontSize.h4.size};
      line-height: ${theme.fontSize.h4.lineheight};
      font-weight: ${theme.fontWeight.bold};
    }
  }

  p {
    max-width: 560px;
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 240px;
    min-height: 48px;
    margin-top: ${theme.spacing[8]};
    padding: ${theme.spacing[12]} ${theme.spacing[32]};
    border-radius: ${theme.radius.button};
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeight.bold};

    &:hover {
      background: ${theme.colors.hover};
    }

    &:focus-visible {
      outline: 3px solid ${theme.colors.primary};
      outline-offset: 4px;
    }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    min-height: 360px;
    gap: ${theme.spacing[12]};

    img {
      width: 300px;
    }

    h1::after {
      font-size: ${theme.fontSize.h5.size};
      line-height: ${theme.fontSize.h5.lineheight};
    }

    a {
      min-width: 0;
      width: min(240px, 100%);
    }
  }
`;
