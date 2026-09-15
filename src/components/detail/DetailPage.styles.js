import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const DetailPageContainer = styled.article`
  display: grid;
  grid-template-columns: minmax(320px, 828px) minmax(320px, 1fr);

  grid-template-areas:
    "image price"
    "content price";

  align-items: start;
  gap: ${theme.spacing[40]};

  .detail-image-area {
    grid-area: image;
  }

  .detail-price-area {
    grid-area: price;
  }

  .detail-content-area {
    grid-area: content;
  }

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    grid-template-columns: minmax(320px, 480px)  minmax(320px, 1fr);
    gap: ${theme.spacing[24]};
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  
    grid-template-areas:
      "image"
      "price"
      "content";
  
    row-gap: ${theme.spacing[48]}
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
  }
`
