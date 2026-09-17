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

  width: 100%;
  min-width: 0;
  aspect-ratio: 300 / 227;

  padding: ${theme.spacing[20]};

  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};

  background-color: ${({ $variant }) =>
    CARD_BACKGROUNDS[$variant] ??
    CARD_BACKGROUNDS.default};

  box-shadow: ${theme.shadow.card};

  color: inherit;
  text-decoration: none;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadow.cardHover};
  }
`;

export const ProductCardContent = styled.div`
  display: flex;
  flex: 1 1 auto;

  width: 100%;
  min-width: 0;
  min-height: 0;

  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[16]};

  text-align: center;
`;

export const ProductCardInfo = styled.div`
  display: flex;
  flex: 1 1 0;

  width: 100%;
  min-width: 0;
  min-height: 0;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[8]};

  text-align: center;
`;

export const ProductCardLogo = styled.img`
  flex: 0 1 auto;

  width: min(120px, 70%);
  min-width: 0;
  height: auto;

  margin-bottom: ${theme.spacing[10]};
`;

export const ProductBadgeList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing[4]};

  width: 100%;
`;

export const ProductName = styled.h3`
  min-width: 0;

  color: ${({ $variant }) =>
    $variant === "night"
      ? theme.colors.white
      : theme.colors.textSecondary};

  font-size: ${theme.fontSize.h6.size};
  line-height: ${theme.fontSize.h6.lineheight};
  font-weight: ${theme.fontWeight.bold};

  word-break: keep-all;

  span {
    color: ${({ $variant }) =>
      $variant === "night"
        ? theme.colors.white
        : theme.colors.textPrimary};
  }
`;

export const ProductPrice = styled.strong`
  display: block;

  margin: ${theme.spacing[4]} 0
    ${theme.spacing[10]};

  color: ${({ $variant }) =>
    $variant === "night"
      ? theme.colors.white
      : theme.colors.textPrimary};

  font-size: ${theme.fontSize.h3.size};
  line-height: 1;
  font-weight: ${theme.fontWeight.bold};
`;

export const ProductCardButton = styled.span`
  flex: 0 1 auto;

  width: 100%;
  margin-top: auto;
  padding: ${theme.spacing[10]};

  border-radius: ${theme.radius.button};

  background-color: ${({ $variant }) =>
    $variant === "night"
      ? theme.colors.buttonMuted
      : theme.colors.primary};

  color: ${({ $variant }) =>
    $variant === "night"
      ? theme.colors.textPrimary
      : theme.colors.white};

  font-size: ${theme.fontSize.label.size};
  text-align: center;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === "night"
        ? theme.colors.buttonMutedHover
        : theme.colors.hover};
  }
`;
