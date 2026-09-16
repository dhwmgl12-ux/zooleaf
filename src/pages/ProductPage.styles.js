import styled from '@emotion/styled';
import { theme } from '../styles/variables';
import { Link } from 'react-router-dom';

export const ProductPageContainer = styled.section`

  h2 { 
    color: ${theme.colors.textPrimary}; 
    font-size: ${theme.fontSize.h3.size}; 
    text-align: center; 
  }
`;

export const ProductBanner = styled(Link)`
  display: block; 
  margin-bottom: ${theme.spacing[64]}; 

  img { 
    display: block; 
    width: 100%; 
    height: auto; 
  }
`

export const ProductPageLayout = styled.div`
  display: flex; 
  gap: ${theme.spacing[32]}; 
  align-items: flex-start;

  .product-page__content { min-width: 0; flex: 1; }
  .product-page__grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(280px, 300px)
    );
    justify-content: center;
    gap: ${theme.spacing[24]};
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    flex-direction: column;
    .product-page__content { width: 100%; }
    .product-page__grid { grid-template-columns: repeat(2, minmax(0, 300px)); justify-content: center; }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    .product-page__grid { grid-template-columns: minmax(0, 300px); justify-content: center; gap: ${theme.spacing[16]}; }
    .product-page__grid > article { width: min(300px, 100%); justify-self: center; }
  }
`