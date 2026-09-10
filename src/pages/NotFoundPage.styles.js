import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[24]};
  padding: ${theme.spacing[64]} 0;
  text-align: center;
  word-break: keep-all;

  img {
    width: 240px;
    max-width: 100%;
    height: auto;
  }

  h1 {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: ${theme.fontSize.body.lineheight};
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: ${theme.spacing[16]} ${theme.spacing[32]};
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
    padding: ${theme.spacing[40]} 0;

    img {
      width: 180px;
    }

    h1 {
      font-size: ${theme.fontSize.h4.size};
      line-height: ${theme.fontSize.h4.lineheight};
    }
  }
`;
