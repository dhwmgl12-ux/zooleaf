import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const GoodsPageContainer = styled.section`
    width: 100%;
    margin: 0 auto; 

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing[64]};

  > h2 { 
    color: ${theme.colors.textPrimary}; 
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    font-weight: ${theme.fontWeight.bold}; 
    text-align: center; 
  }

  .goods-page__filters {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(148px, 1fr);
    align-items: center;

    width: 100%;
    padding: ${theme.spacing[8]} ${theme.spacing[16]};

    border-radius: ${theme.radius.box};
    background-color: ${theme.colors.white};
    box-shadow: 0 3px 10px rgb(44 62 53 / 8%);
  } 

  
  nav { min-width: 0; border-right: 1px solid ${theme.colors.background2}; padding: 0 ${theme.spacing[32]}; }
  nav ul { 
    display: grid; 
    grid-template-columns: repeat(5, minmax(0, 1fr)); 
    align-items: center; 
  }
  nav button { 
    width: 100%; 
    padding: ${theme.spacing[20]} ${theme.spacing[4]}; 
    color: ${theme.colors.textPrimary}; 
    font-size: ${theme.fontSize.h5.size}; 
    font-weight: ${theme.fontWeight.semiBold}; 
    white-space: nowrap; 
  }
  nav button:hover { color: ${theme.colors.primary}; }

  .goods-page__sort { position: relative; width: min(150px, 100%); justify-self: center; }
  .goods-page__sort-trigger,
  .goods-page__sort li button { display: flex; width: 100%; align-items: center; justify-content: center; color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.h6.size}; font-weight: ${theme.fontWeight.medium}; }
  .goods-page__sort-trigger { position: relative; padding: ${theme.spacing[14]} ${theme.spacing[32]} ${theme.spacing[14]} ${theme.spacing[16]}; border: 1px solid ${theme.colors.background2}; border-radius: ${theme.radius.button}; background-color: ${theme.colors.white}; }
  .goods-page__sort-arrow { position: absolute; right: ${theme.spacing[16]}; width: 7px; height: 7px; border-right: 1px solid ${theme.colors.textSecondary}; border-bottom: 1px solid ${theme.colors.textSecondary}; transform: rotate(45deg) translateY(-2px); transition: transform 0.2s ease; }
  .goods-page__sort-trigger[aria-expanded='true'] .goods-page__sort-arrow { transform: rotate(225deg) translateY(-2px); }
  .goods-page__sort ul { position: absolute; z-index: 2; top: calc(100% + ${theme.spacing[4]}); width: 100%; overflow: hidden; border: 1px solid ${theme.colors.background2}; border-radius: ${theme.radius.input}; background-color: ${theme.colors.white}; box-shadow: 0 4px 10px rgba(44, 62, 53, 0.1); }
  .goods-page__sort li + li { border-top: 1px solid ${theme.colors.background2}; }
  .goods-page__sort li button { padding: ${theme.spacing[10]} ${theme.spacing[12]}; }
  .goods-page__sort li button:hover { background-color: ${theme.colors.background2}; color: ${theme.colors.primary}; }
  
  .goods-page__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
    gap: ${theme.spacing[40]};

    width: 100%;
  }

  .goods-page__grid > article {
    min-width: 0;
    width: 100%;
  }
  
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    .goods-page__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding-top: ${theme.spacing[24]};
    padding-bottom: ${theme.spacing[80]};
    h1 { margin-bottom: ${theme.spacing[20]}; }
    .goods-page__filters { width: 100%; grid-template-columns: 1fr; gap: ${theme.spacing[8]}; margin-left: 0; }
    nav { border-right: 0; padding: 0; }
    nav ul { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }
    nav button { padding: ${theme.spacing[12]} 0; font-size: ${theme.fontSize.h6.size}; white-space: nowrap; }
    .goods-page__sort { width: 100%; }
    .goods-page__grid { grid-template-columns: 1fr; gap: ${theme.spacing[16]}; }
  }
`;
