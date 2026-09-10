import styled from "@emotion/styled";
import { theme } from "../../styles/variables.js";

export const LayoutContainer = styled.main`
  width: 100%;
  padding-top: ${({ $isMainPage }) => ($isMainPage ? "0" : "var(--header-height, 96px)")};
  padding-bottom: ${({ $noBottomPadding }) => ($noBottomPadding ? "0" : theme.spacing[200])};
  background-color: ${({ $isMainPage }) => $isMainPage ? theme.colors.background : theme.colors.background2 };
`