import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const DetailPriceContainer = styled.section`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing[32]};
  border-radius: ${theme.radius.box};
`

export const DetailPriceInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.border};

  nav {
    margin-bottom: ${theme.spacing[8]};
  }

  ol {
    display: flex;
    gap: ${theme.spacing[4]};
    color: ${theme.colors.textSecondary};
  }

  li:first-of-type {
    padding-right: 16px;
    position: relative;

    &::after {
      content: ">";
      position: absolute;
      top: 50%;
      transform: translateY(-57%);
      right: 0;
    }
  }

  h2 {
    margin-bottom: ${theme.spacing[4]};
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    letter-spacing: ${theme.fontSize.h3.letterspacing};
    font-weight: ${theme.fontWeight.bold};
  }
  
  p {
    margin-bottom: ${theme.spacing[24]};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
  }
  
  p:last-of-type {
    margin-bottom: ${theme.spacing[32]};
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    font-weight: ${theme.fontWeight.bold};
  }
  `

export const Rating = styled.div`
  display: flex;
  gap: ${theme.spacing[10]};
  margin-bottom: ${theme.spacing[24]};
  
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

export const DetailPriceForm = styled.form`
  width: 100%;
`

export const DeliveryInfo = styled.dl`
  
`

export const OptionSelector = styled.fieldset`
  display: flex;
  
`
