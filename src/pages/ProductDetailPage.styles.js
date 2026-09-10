import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const ProductDetailPageContainer = styled.article`
  display: grid;
  grid-template-columns:
    minmax(320px, 828px)
    minmax(320px, 1fr);

  grid-template-areas:
    "image price"
    "content price";

  align-items: start;
  gap: ${theme.spacing[40]};

  div {
    width: 100%
  }

  .detail-image-area {
    grid-area: image;
  }

  .detail-price-area {
    grid-area: price;
    position: sticky;
    top: calc(96px + ${theme.spacing[100]});
  }

  .detail-content-area {
    grid-area: content;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-template-columns: minmax(0, 1fr);

    grid-template-areas:
      "image"
      "price"
      "content";

    row-gap: ${theme.spacing[48]};

    .detail-price-area {
      position: static;
    }
  }
`
