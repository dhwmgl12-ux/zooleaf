import styled from '@emotion/styled';
import { theme } from '../../styles/variables';
import { ContentContainer } from './ContentContainer.styles';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100%;
  color: ${theme.colors.textPrimary};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  background-color: ${({ $isOverHero }) =>
    $isOverHero ? 'rgba(255, 255, 252, 0.35)' : theme.colors.background};

  backdrop-filter: ${({ $isOverHero }) => ($isOverHero ? 'blur(10px)' : 'none')};

  transition:
    background-color 0.25s ease,
    backdrop-filter 0.25s ease,
    box-shadow 0.25s ease;
`;
export const HeaderInner = styled(ContentContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[16]} 0;
`;

export const LogoHeading = styled.h1`
  width: 200px;
`;

export const LogoLink = styled(Link)`
  display: block;
`;

export const LogoImage = styled.img`
  width: 100%;
  height: auto;
`;

export const NavList = styled.ul`
  display: flex;
  gap: ${theme.spacing[56]};
`;

export const NavLink = styled(Link)`
  font-size: ${theme.fontSize.h5.size};
  line-height: ${theme.fontSize.h5.lineheight};
  font-weight: ${theme.fontWeight.semiBold};
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${theme.colors.primary};
  }
`;

export const UtilsList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[32]};
`;

export const IconLink = styled(Link)`
  position: relative;
  display: flex;
  color: inherit;

  svg {
    color: inherit;
    transition: color 0.2s ease;
  }

  &:hover svg,
  &:focus-visible svg {
    color: ${theme.colors.primary};
  }

  &:hover [data-tooltip],
  &:focus-within [data-tooltip] {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  top: calc(100% + ${theme.spacing[12]});
  left: 50%;
  transform: translate(-50%, -4px);
  white-space: nowrap;

  padding: ${theme.spacing[8]} ${theme.spacing[12]};
  border-radius: ${theme.radius.input};
  background: ${theme.colors.textPrimary};
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.caption.size};

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
`;

export const IconButton = styled.button`
  display: flex;
  color: inherit;

  svg {
    color: inherit;
    transition: color 0.2s ease;
  }

  &:hover svg,
  &:focus-visible svg {
    color: ${theme.colors.primary};
  }
`;

export const AccountMenuTrigger = styled.li`
  position: relative;
  
  &:hover [data-account-dropdown],
  &:focus-within [data-account-dropdown] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0)
  }
`;

export const AccountDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  padding: ${theme.spacing[16]};
  
  
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s ease, transform 0.2s ease, visivility 0.2s ease;
  `;

export const AccountCard = styled.div`
  width: 280px;
  padding: ${theme.spacing[32]} ${theme.spacing[24]};
  border-radius: ${theme.radius.box};
  background: ${theme.colors.background};
  box-shadow: 4px 4px 4px 12px 0 rgba(0, 0, 0, 0.12);
  color: ${theme.colors.textPrimary};

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const AccountAvatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.h3.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.white};
`;

export const AccountName = styled.p`
  margin-top: ${theme.spacing[16]};
  font-size: ${theme.fontSize.h6.size};
  font-weight: ${theme.fontWeight.bold};
`;

export const AccountInfoList = styled.div`
  margin-top: ${theme.spacing[24]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textSecondary};
`;

export const AccountDivider = styled.hr`
  width: 100%;
  margin: ${theme.spacing[24]} 0;
  border-top: 1px solid ${theme.colors.border};
`;

export const LogoutButton = styled.button`
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.primary};
  text-decoration: underline;
  font-weight: ${theme.fontWeight.medium};

  &:hover {
    color: ${theme.colors.hover};
  }
`;