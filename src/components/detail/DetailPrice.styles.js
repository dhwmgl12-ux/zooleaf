import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const DetailPriceContainer = styled.section`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing[32]};
  border-radius: ${theme.radius.box};
  box-shadow: 4px 4px 8px rgb(0 0 0 / 8%);
  
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${theme.spacing[24]};
    
  }
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

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.h4.size};
      line-height: ${theme.fontSize.h4.lineheight};
      letter-spacing: ${theme.fontSize.h4.letterspacing};
    }
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

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.h4.size};
      line-height: ${theme.fontSize.h4.lineheight};
      letter-spacing: ${theme.fontSize.h4.letterspacing};
    }
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
  width: 100%;
  padding: ${theme.spacing[32]} 0;

  display: flex;
  justify-content: space-between;

  dt {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
  
  dd {
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    font-weight: ${theme.fontWeight.regular};

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      max-width: 70%;
      font-size: ${theme.fontSize.bodysmall.size};
      line-height: ${theme.fontSize.bodysmall.lineheight};
    }
  }
`

export const OptionSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  margin-bottom: ${theme.spacing[32]};

  h3 {
    flex-shrink: 0;
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
`

export const OptionDropdown = styled.div`
  position: relative;
  width: min(70%, 300px);

  font-size: ${theme.fontSize.bodylarge.size};
  line-height: ${theme.fontSize.bodylarge.lineheight};
  font-weight: ${theme.fontWeight.regular};
  
  option {
    border-radius: ${theme.radius.box};
    background-color: ${theme.colors.white};
    color: ${theme.colors.textPrimary};
  }

  @media (max-width: 430px) {
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
  }
`

export const OptionButton = styled.button`
  width: 100%;
  min-height: 48px;
  padding: ${theme.spacing[4]} ${theme.spacing[16]};
  border: 1px solid ${theme.colors.background2};
  border-radius: ${theme.radius.button};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${theme.colors.background2};
  }
`

export const OptionList = styled.ul`
  position: absolute;
  top: calc(100% + ${theme.spacing[4]});
  left: 0;
  z-index: 10;
  
  width: 100%;
  
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.input};
  background-color: ${theme.colors.white};
  box-shadow: 4px 4px 8px rgb(0 0 0 / 12%);
  
  li {
    width: 100%;
    border-bottom: 1px solid ${theme.colors.border};
    
    &:hover {
      background-color: ${theme.colors.background2};
    }
  }
  
  button {
    width: 100%;
    text-align: left;
    padding: ${theme.spacing[8]} ${theme.spacing[16]};
  }
  
  `

export const SelectedOptionCard = styled.div`
  width: 100%;
  padding: ${theme.spacing[16]};
  background-color: ${theme.colors.background2};
  margin-bottom: ${theme.spacing[16]};

  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[16]};

  .selected-option-value {
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    font-weight: ${theme.fontWeight.regular};

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }
  }

  .selected-option-price {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.semiBold};

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
`

export const SelectedOptionCardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }
  }

  button {
    padding: ${theme.spacing[8]};
  }

  button:hover {
    background-color: ${theme.colors.border};
  }
`

export const SelectedOptionCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
  
  p {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
`


export const QuantitySelector = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing[32]};

  h3 {
    flex-shrink: 0;
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
`

export const QuantityControl = styled.div`
  display: grid;
  grid-template-columns: ${({ $compact }) =>
    $compact ? "32px 60px 32px" : "32px minmax(32px, 1fr) 32px"};
  align-items: center;
  width: min(60%, 280px);
  text-align: center;

  button {
    width: 32px;
    height: 32px;
    border: 1px solid ${theme.colors.primary};
    border-radius: 8px;

    color: ${theme.colors.primary};

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:hover {
      background-color: ${({ $compact }) =>
        $compact
          ? theme.colors.border
          : theme.colors.background2};
    }
  }

  output {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
  }
`

export const DiscountInfo = styled.dl`
  width: 100%;
  padding: ${theme.spacing[32]} 0;
  border-bottom: 1px solid ${theme.colors.border};

  display: flex;
  justify-content: space-between;

  dt {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
  
  dd {
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    font-weight: ${theme.fontWeight.regular};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }
  }
`

export const PaymentBenefits = styled.section`
  width: 100%;
  padding: ${theme.spacing[32]} 0;
  border-bottom: 1px solid ${theme.colors.border};

  h3 {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h6.size};
      line-height: ${theme.fontSize.h6.lineheight};
    }
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    font-weight: ${theme.fontWeight.regular};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }
  }

`

export const TotalPriceRow = styled.dl`
  width: 100%;
  padding: ${theme.spacing[32]} 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  dt {
    font-size: ${theme.fontSize.h4.size};
    line-height: ${theme.fontSize.h4.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primary};

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h5.size};
      line-height: ${theme.fontSize.h5.lineheight};
    }
  }
  
  dd {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primary};

    @media (max-width: 430px) {
      font-size: ${theme.fontSize.h4.size};
      line-height: ${theme.fontSize.h4.lineheight};
    }

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      font-size: ${theme.fontSize.h5.size};
      line-height: ${theme.fontSize.h5.lineheight};
    }
  }

`

export const CartButton = styled.button`
  width: 100%;
  padding: ${theme.spacing[16]} ${theme.spacing[20]};
  border: none;
  border-radius: ${theme.radius.button};
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};

  font-size: ${theme.fontSize.buttonlarge.size};
  line-height: ${theme.fontSize.buttonlarge.lineheight};
  font-weight: ${theme.fontWeight.bold};

  cursor: pointer;
  transition:background-color 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.hover};
  }

  &:disabled {
    background-color: ${theme.colors.border};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    font-size: ${theme.fontSize.button.size};
    line-height: ${theme.fontSize.button.lineheight};
  }
`