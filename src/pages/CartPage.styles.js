import styled from "@emotion/styled";
import { theme } from "../styles/variables";

export const Container = styled.main`
min-height: 100vh
padding: ${theme.spacing[32]} ${theme.spacing[24]}
background: ${theme.colors.background2};
color:${theme.colors.textPrimary};
`;

export const Title = styled.h2`
max-width: ${theme.layout.maxWidth}
margin: 0 auto ${theme.spacing[24]}
font-size: ${theme.fontSize.h4.size}
line-height: ${theme.fontSize.h4.lineheight}
font-weight: ${theme.fontWeight.bold};
color: ${theme.colors.textPrimary};
`;

export const CartTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: ${theme.layout.maxWidth};
  margin: 0 auto ${theme.spacing[16]};

  padding-right: 364px;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding-right: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing[8]};
  }
`;
