import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const FooterContainer = styled.footer`
  width: 100%;
  padding: ${theme.spacing[32]} 0 ${theme.spacing[24]} 0;
  color: ${theme.colors.white};
  background-color: ${theme.colors.backgroundFooter};
  font-size:  ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};
  font-weight: ${theme.fontWeight.regular};
  text-align: center;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    min-width: 320px;
    padding: ${theme.spacing[24]} 0 ${theme.spacing[16]} 0;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing[24]};
  margin-bottom: ${theme.spacing[56]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    justify-content: center;
    gap: ${theme.spacing[32]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing[16]};
    margin-bottom: ${theme.spacing[24]};
  }
`;

export const FooterColumn = styled.div`
  flex: 1 1 140px;

  p, li:not(:last-child) {
    margin-bottom: ${theme.spacing[4]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex: 0 0 auto;
  }
`;

export const FooterColumnDetails = styled.div`
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    display: none;
  }
`;

export const FooterTitle = styled.h2`
  margin-bottom: ${theme.spacing[12]};
  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};
  font-weight: ${theme.fontWeight.medium};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    margin: 0;
  }
`;

export const FooterPolicyList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[24]};
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing[20]};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    gap: ${theme.spacing[12]};
    margin-bottom: ${theme.spacing[16]};
  }
`;

export const FooterPolicyButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterPolicyItem = styled.li`
  position: relative;
  padding-left: ${theme.spacing[24]};

  &::before {
    content: "";
    width: 1px;
    height: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: ${theme.colors.white};
  }

  &:first-of-type::before {
    display: none;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding-left: ${theme.spacing[12]};

    &::before {
      display: none;
    }
  }
`;

export const FooterCopyright = styled.p``;