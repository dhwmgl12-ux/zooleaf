import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const GoodsCardContainer = styled.article`
  overflow: hidden;
  border-radius: ${theme.radius.box};
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 6px rgba(44, 62, 53, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(44, 62, 53, 0.16);
  }

  .goods-card__link { display: block; color: inherit; }
  .goods-card__image { position: relative; aspect-ratio: 1 / 1; overflow: hidden; background-color: ${theme.colors.background2}; }
  .goods-card__image img { width: 100%; height: 100%; object-fit: cover; }
  .goods-card__image > span { display: grid; width: 100%; height: 100%; place-items: center; color: ${theme.colors.textSecondary}; font-size: ${theme.fontSize.caption.size}; }
  .goods-card__content { display: flex; min-height: 94px; flex-direction: column; padding: ${theme.spacing[12]}; }
  .goods-card__badges { position: absolute; top: ${theme.spacing[8]}; left: ${theme.spacing[8]}; display: flex; flex-wrap: wrap; gap: ${theme.spacing[4]}; }
  .goods-card__badges li { padding: 3px ${theme.spacing[8]}; border-radius: ${theme.radius.button}; background-color: ${theme.colors.white}; color: ${theme.colors.error}; font-size: ${theme.fontSize.caption.size}; font-weight: ${theme.fontWeight.bold}; line-height: 1; box-shadow: 0 1px 3px rgba(44, 62, 53, 0.1); }
  h3 { margin: 0; color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.caption.size}; font-weight: ${theme.fontWeight.semiBold}; }
  .goods-card__price { display: flex; align-items: end; justify-content: space-between; gap: ${theme.spacing[8]}; margin-top: auto; }
  .goods-card__price div { display: flex; flex-direction: column; color: ${theme.colors.textSecondary}; font-size: ${theme.fontSize.caption.size}; }
  .goods-card__price span { color: ${theme.colors.error}; }
  strong { color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.label.size}; }
  .goods-card__single-price { display: block; margin-top: auto; text-align: right; }
`;
