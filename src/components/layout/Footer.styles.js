import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const FooterContainer = styled.footer`
  width: 100%;
  margin-top: ${theme.spacing[200]};
  padding: ${theme.spacing[32]} 0 ${theme.spacing[24]} 0;

  color: ${theme.colors.white};
  background-color: ${theme.colors.backgroundFooter};

  .footer__title, .footer-content, .footer-policy, .footer-copyright {
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
    font-weight: ${theme.fontWeight.regular};
    text-align: center;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${theme.spacing[56]};
  }
  
  .footer-company p, .footer-customer p,
  .footer-customer li:not(:last-child), .footer-links li:not(:last-child), .footer-partners li:not(:last-child) {
    margin-bottom: ${theme.spacing[4]};
  }

  .footer__title {
    margin-bottom: ${theme.spacing[12]};
  }

  .footer-policy {
    display: flex;
    gap: ${theme.spacing[24]};
    justify-content: center;
    align-items: center;
    margin-bottom: ${theme.spacing[20]};
  }

  .footer-policy li {
    position: relative;
    padding-left: 24px;
  }

  .footer-policy li::before {
    content: "";
    width: 1px;
    height: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: ${theme.colors.white};
  }

  .footer-policy li:first-child::before {
    display: none;
  }
`