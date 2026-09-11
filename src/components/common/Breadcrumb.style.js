import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { theme } from "../../styles/variables";

export const BreadcrumbWrapper = styled.nav`
  position: fixed;
  top: var(--header-height, 96px);
  left: 0;
  right: 0;
  height: 46px;
  display: flex;
  align-items: center;
  background: ${theme.colors.background};
  border-top: 1px solid ${theme.colors.background2};
  z-index: 999;
`;


export const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[8]};
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textSecondary};
`;

export const BreadcrumbLink = styled(Link)`
  color: ${theme.colors.textSecondary};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const BreadcrumbCurrent = styled.span`
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.medium};
`;

export const BreadcrumbSeparator = styled.span`
  color: ${theme.colors.border};
`;