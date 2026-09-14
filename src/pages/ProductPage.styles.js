import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const ProductPageContainer = styled.main`
  padding: ${theme.spacing[48]} 0 ${theme.spacing[140]};

  .product-page__banner { display: block; margin-bottom: ${theme.spacing[48]}; }
  .product-page__banner img { display: block; width: 100%; height: auto; }
  .product-page__layout { display: flex; gap: ${theme.spacing[32]}; align-items: flex-start; }
  .product-page__content { min-width: 0; flex: 1; }
  h1 { margin: 0 0 ${theme.spacing[32]}; color: ${theme.colors.textPrimary}; font-size: ${theme.fontSize.h3.size}; text-align: center; }
  .product-page__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: ${theme.spacing[24]}; }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding-top: ${theme.spacing[32]};
    .product-page__layout { flex-direction: column; }
    .product-page__content { width: 100%; }
    .product-page__grid { grid-template-columns: repeat(2, minmax(0, 300px)); justify-content: center; }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding-top: ${theme.spacing[24]};
    .product-page__banner { margin-bottom: ${theme.spacing[24]}; }
    h1 { margin-bottom: ${theme.spacing[20]}; font-size: ${theme.fontSize.h4.size}; }
    .product-page__grid { grid-template-columns: minmax(0, 300px); justify-content: center; gap: ${theme.spacing[16]}; }
    .product-page__grid > article { width: min(300px, 100%); justify-self: center; }
  }
`;
