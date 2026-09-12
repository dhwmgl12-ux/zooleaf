import styled from "@emotion/styled";
import { theme } from "../../styles/variables.js";

export const LayoutContainer = styled.main`
  width: 100%;
  padding-top: ${({ $isMainPage, $hasBreadcrumb, $isAboutPage }) => {
    if ($isMainPage) {
      return "0";}
    if ($isAboutPage) {
      return `
        calc(
          var(--header-height, 96px) + var(--breadcrumb-height, 46px)
        )
      `;}
    if ($hasBreadcrumb) {
      return `
        calc(
          var(--header-height, 96px) + var(--breadcrumb-height, 46px) + 6.25rem
        )
      `;
    } else {
      return `
        calc(
          var(--header-height, 96px) + 6.25rem
        )
      `
    }
  }};


  padding-bottom: 200px;
  background-color: ${({ $isMainPage }) => $isMainPage ? theme.colors.background : theme.colors.background2 };

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    min-width: 320px;
    padding-top: ${({ $isMainPage, $hasBreadcrumb, $isAboutPage }) => {
      if ($isMainPage) {
        return "0";}
      if ($isAboutPage) {
        return `
          calc(
            var(--header-height, 96px) + var(--breadcrumb-height, 46px)
          )
        `;}
      if ($hasBreadcrumb) {
        return `
          calc(
            var(--header-height, 96px) + var(--breadcrumb-height, 46px) + 5rem
          )
        `;
      } else {
        return `
          calc(
            var(--header-height, 96px) + 5rem
          )
        `
      }
    }};
  }
`