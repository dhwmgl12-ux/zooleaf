import styled from "@emotion/styled";
import { theme } from "../../styles/variables.js";

export const LayoutContainer = styled.main`
  width: 100%;
  padding-top: ${({ $isMainPage, $hasBreadcrumb, }) => {
    if ($isMainPage) {return "0";}
    if ($hasBreadcrumb) {
      return `
        calc(
          var(--header-height, 96px) + var(--breadcrumb-height, 46px) + 6.25rem
        )
      `;
    }
  }};
  padding-bottom: ${({ $noBottomPadding }) => ($noBottomPadding ? "0" : theme.spacing[200])};
  background-color: ${({ $isMainPage }) => $isMainPage ? theme.colors.background : theme.colors.background2 };
`