import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const ProductCardContainer = styled.article`
  display: flex;
  min-height: 230px;
  padding: ${theme.spacing[16]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};
  background-color: ${({ $background }) => $background};
  box-shadow: 0 4px 10px rgba(44, 62, 53, 0.1);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: 0 7px 16px rgba(44, 62, 53, 0.18);
  }

  .product-card__content { display: flex; width: 100%; flex-direction: column; align-items: center; text-align: center; }
  .product-card__logo { width: min(142px, 80%); margin-bottom: ${theme.spacing[10]}; }
  h3 { margin: 0; color: ${({ $isDark }) => ($isDark ? theme.colors.white : theme.colors.textSecondary)}; font-size: ${theme.fontSize.label.size}; font-weight: ${theme.fontWeight.medium}; }
  strong { display: block; margin: ${theme.spacing[4]} 0 ${theme.spacing[16]}; color: ${({ $isDark }) => ($isDark ? theme.colors.white : theme.colors.textPrimary)}; font-size: ${theme.fontSize.h4.size}; line-height: 1; }
  .product-card__button { width: 100%; margin-top: auto; padding: ${theme.spacing[10]}; border-radius: ${theme.radius.button}; background-color: ${({ $isDark }) => ($isDark ? '#D9D9D9' : theme.colors.primary)}; color: ${({ $isDark }) => ($isDark ? theme.colors.textPrimary : theme.colors.white)}; font-size: ${theme.fontSize.caption.size}; text-align: center; transition: background-color 0.2s ease; }
  .product-card__button:hover { background-color: ${({ $isDark }) => ($isDark ? '#C8C9C9' : theme.colors.hover)}; }
`;
