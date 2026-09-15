import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

const CARD_BACKGROUNDS = {
  default: theme.colors.white,
  night: theme.colors.productCardNight,
  family: theme.colors.productCardFamily,
  couple: theme.colors.productCardCouple,
  dream: theme.colors.productCardDream,
  membership: theme.colors.productCardMembership,
};

export const ProductCardContainer = styled.article`
  display: flex;
  aspect-ratio: 300 / 227;
  padding: ${theme.spacing[24]} ${theme.spacing[16]} ${theme.spacing[8]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};
  background-color: ${({ $variant }) => CARD_BACKGROUNDS[$variant] ?? CARD_BACKGROUNDS.default};
  box-shadow: ${theme.shadow.card};
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadow.cardHover};
  }

  .product-card__content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .product-card__logo {
    width: min(120px, 70%);
    margin-bottom: ${theme.spacing[10]};
  }

  h3 {
    margin: 0;
    color: ${({ $variant }) => ($variant === 'night' ? theme.colors.white : theme.colors.textSecondary)};
    font-size: ${theme.fontSize.label.size};
    font-weight: ${theme.fontWeight.bold};
    line-height: ${theme.fontSize.label.lineheight};
  }

  h3 span {
    color: ${({ $variant }) => ($variant === 'night' ? theme.colors.white : theme.colors.textPrimary)};
  }

  strong {
    display: block;
    margin: ${theme.spacing[4]} 0 ${theme.spacing[10]};
    color: ${({ $variant }) => ($variant === 'night' ? theme.colors.white : theme.colors.textPrimary)};
    font-size: ${theme.fontSize.h4.size};
    line-height: 1;
  }

  .product-card__button {
    width: 100%;
    margin-top: auto;
    padding: ${theme.spacing[10]};
    border-radius: ${theme.radius.button};
    background-color: ${({ $variant }) => ($variant === 'night' ? theme.colors.buttonMuted : theme.colors.primary)};
    color: ${({ $variant }) => ($variant === 'night' ? theme.colors.textPrimary : theme.colors.white)};
    font-size: ${theme.fontSize.label.size};
    text-align: center;
    transition: background-color 0.2s ease;
  }

  .product-card__button:hover {
    background-color: ${({ $variant }) => ($variant === 'night' ? theme.colors.buttonMutedHover : theme.colors.hover)};
  }
`;
