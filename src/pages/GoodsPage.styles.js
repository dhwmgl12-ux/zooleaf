import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const GoodsPageContainer = styled.main`
  padding: ${theme.spacing[64]} 0 ${theme.spacing[140]};

  section { width: min(760px, calc(100% - ${theme.spacing[32]})); margin: 0 auto; }
  h1 { margin: 0 0 ${theme.spacing[32]}; color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.h4.size}; text-align: center; }
  .goods-page__filters { display: grid; width: calc(100% + ${theme.spacing[80]}); box-sizing: border-box; grid-template-columns: 2fr 1fr; align-items: center; margin-bottom: ${theme.spacing[32]}; margin-left: -${theme.spacing[40]}; padding: ${theme.spacing[8]} ${theme.spacing[16]}; border-radius: ${theme.radius.box}; background-color: ${theme.colors.white}; box-shadow: 0 3px 10px rgba(44, 62, 53, 0.08); }
  nav { min-width: 0; border-right: 1px solid ${theme.colors.background2}; padding: 0 ${theme.spacing[32]}; }
  nav ul { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); align-items: center; }
  nav button { width: 100%; padding: ${theme.spacing[20]} ${theme.spacing[4]}; color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.body.size}; font-weight: ${theme.fontWeight.medium}; white-space: nowrap; }
  nav button:hover { color: ${theme.colors.textSecondary}; }
  .goods-page__sort { position: relative; width: 148px; justify-self: center; }
  .goods-page__sort-trigger,
  .goods-page__sort li button { display: flex; width: 100%; align-items: center; justify-content: center; color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.label.size}; font-weight: ${theme.fontWeight.medium}; }
  .goods-page__sort-trigger { position: relative; padding: ${theme.spacing[14]} ${theme.spacing[32]} ${theme.spacing[14]} ${theme.spacing[16]}; border: 1px solid ${theme.colors.background2}; border-radius: ${theme.radius.button}; background-color: ${theme.colors.white}; }
  .goods-page__sort-arrow { position: absolute; right: ${theme.spacing[16]}; width: 7px; height: 7px; border-right: 1px solid ${theme.colors.textSecondary}; border-bottom: 1px solid ${theme.colors.textSecondary}; transform: rotate(45deg) translateY(-2px); transition: transform 0.2s ease; }
  .goods-page__sort-trigger[aria-expanded='true'] .goods-page__sort-arrow { transform: rotate(225deg) translateY(-2px); }
  .goods-page__sort ul { position: absolute; z-index: 2; top: calc(100% + ${theme.spacing[4]}); width: 100%; overflow: hidden; border: 1px solid ${theme.colors.background2}; border-radius: ${theme.radius.input}; background-color: ${theme.colors.white}; box-shadow: 0 4px 10px rgba(44, 62, 53, 0.1); }
  .goods-page__sort li + li { border-top: 1px solid ${theme.colors.background2}; }
  .goods-page__sort li button { padding: ${theme.spacing[10]} ${theme.spacing[12]}; }
  .goods-page__sort li button:hover { background-color: ${theme.colors.background2}; color: ${theme.colors.primary}; }
  .goods-page__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: ${theme.spacing[24]}; }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    .goods-page__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding-top: ${theme.spacing[40]};
    .goods-page__filters { width: 100%; grid-template-columns: 1fr; gap: ${theme.spacing[8]}; margin-left: 0; }
    nav { border-right: 0; padding: 0; }
    nav ul { display: flex; justify-content: flex-start; gap: ${theme.spacing[16]}; overflow-x: auto; }
    nav button { white-space: nowrap; }
    .goods-page__sort { width: 100%; }
    .goods-page__grid { grid-template-columns: 1fr; gap: ${theme.spacing[16]}; }
  }
`;
