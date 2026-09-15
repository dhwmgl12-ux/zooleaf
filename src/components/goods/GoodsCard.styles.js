import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const GoodsCardContainer = styled.article`
  width: 100%;
  height: 100%;
  overflow: hidden;

  border: 1px solid ${theme.colors.background2};
  border-radius: ${theme.radius.box};
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadow.card};

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.secondary};
    box-shadow: ${theme.shadow.cardHover};
  }

  .goods-card__link {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    color: inherit;
  }

  .goods-card__image {
    position: relative;
    flex-shrink: 0;

    width: 100%;
    aspect-ratio: 7 / 5;
    overflow: hidden;

    background-color: ${theme.colors.background2};
  }

  .goods-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: transform 0.3s ease;
  }

  &:hover .goods-card__image img {
    transform: scale(1.03);
  }

  .goods-card__image > span {
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;

    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.caption.size};
  }

  .goods-card__badges {
    position: absolute;
    top: ${theme.spacing[16]};
    left: ${theme.spacing[16]};

    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing[4]};
  }

  .goods-card__badges li {
    padding: ${theme.spacing[10]} ${theme.spacing[16]};

    border-radius: ${theme.radius.button};
    background-color: ${theme.colors.white};
    box-shadow: 0 4px 8px rgb(0 0 0 / 18%);

    color: ${theme.colors.error};
    font-size: ${theme.fontSize.body.size};
    font-weight: ${theme.fontWeight.bold};
    line-height: 1;
  }
`;

export const GoodsCardContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 160px;
  flex-direction: column;

  padding: ${theme.spacing[24]};

  h3 {
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    line-height: ${theme.fontSize.h5.lineheight};
    word-break: keep-all;
  }

  .goods-card__price {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: ${theme.spacing[12]};
  }

  .goods-card__price del {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.bodylarge.size};
    font-weight: ${theme.fontWeight.medium};
  }

  .goods-card__price > div {
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacing[12]};

    margin-top: auto;
  }

  .goods-card__price span {
    color: ${theme.colors.error};
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
  }

  strong {
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h4.size};
    font-weight: ${theme.fontWeight.bold};
    line-height: ${theme.fontSize.h4.lineheight};
  }

  .goods-card__price strong {
    margin-left: auto;
    text-align: right;
  }

  .goods-card__single-price {
    align-self: flex-end;
    margin-top: auto;
  }


  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    min-height: 140px;
    padding: ${theme.spacing[20]};

    h3,
    strong {
      font-size: ${theme.fontSize.h5.size};
    }
  }
`;