import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const ReviewCardContainer = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
  aspect-ratio: 343 / 300;
  border-radius: ${theme.radius.box};
  color: ${theme.colors.white};
  background-color: ${theme.colors.background};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover > .review-card__content {
    opacity: 1;
  }

`

export const ReviewCardContent = styled.div`
  position: absolute;
  height: 40%;
  right: 0;
  bottom: 0;
  left: 0;

  opacity: 0;

  padding: ${theme.spacing[16]};
  background-color: rgb(0 0 0 / 70%);
  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};

  transition: opacity 0.2s ease;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    opacity: 1;
    transition: none;
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    .review-card__text {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`

export const Rating = styled.div`
  display: flex;
  gap: ${theme.spacing[10]};
  margin-bottom: ${theme.spacing[8]};
  align-items: center;
  
  div {
    display: flex;
    gap: 2px;
    
    img {
      width: 16px
    }
  }
  
  span {
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
  }
`