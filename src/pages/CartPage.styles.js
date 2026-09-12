import styled from "@emotion/styled";
import { theme } from "../styles/variables";

export const Container = styled.main`
  min-height: 100vh;
  padding: ${theme.spacing[32]} ${theme.spacing[24]};
  background: ${theme.colors.background2};
  color: ${theme.colors.textPrimary};
`;

export const Title = styled.h2`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto ${theme.spacing[24]};
  font-size: ${theme.fontSize.h4.size};
  line-height: ${theme.fontSize.h4.lineheight};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textPrimary};
`;

export const CartTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: ${theme.layout.maxWidth};
  margin: 0 auto ${theme.spacing[16]};

  padding-right: 364px;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding-right: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing[8]};
  }
`;

export const SelectAllLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[8]};

  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};
  font-weight: ${theme.fontWeight.medium};

  color: ${theme.colors.textPrimary};

  cursor: pointer;

  input[type="checkbox"] {
    position: static;
    flex-shrink: 0;
  }
`;

export const CheckBox = styled.input`
  width: 16px;
  height: 16px;

  margin: 0;

  accent-color: ${theme.colors.primary};

  cursor: pointer;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    position: absolute;

    top: ${theme.spacing[12]};
    left: ${theme.spacing[12]};

    z-index: 1;
  }
`;

export const SelectDeleteButton = styled.button`
  padding: ${theme.spacing[8]} ${theme.spacing[12]};

  border: 1px solid ${theme.colors.border};
  border-radius: 6px;

  background: ${theme.colors.white};
  color: ${theme.colors.textSecondary};

  font-size: ${theme.fontSize.caption.size};
  line-height: ${theme.fontSize.caption.lineheight};

  cursor: pointer;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    align-self: flex-end;
  }
`;

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: ${theme.spacing[24]};
  align-items: start;

  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const CartContent = styled.section`
  min-width: 0;
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-height: 560px;
  padding: ${theme.spacing[48]} ${theme.spacing[24]};
  text-align: center;
  color: ${theme.colors.textSecondary};
  background: transparent;

  p {
    max-width: 100%;
    margin: 0;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  p:first-of-type {
    margin-top: ${theme.spacing[40]};
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h6.size};
    line-height: ${theme.fontSize.h6.lineheight};
    font-weight: ${theme.fontWeight.bold};
  }

  p + p {
    margin-top: ${theme.spacing[12]};
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    min-height: 480px;
    padding: ${theme.spacing[40]} ${theme.spacing[20]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    min-height: 380px;
    padding: ${theme.spacing[32]} ${theme.spacing[12]};

    p:first-of-type {
      margin-top: ${theme.spacing[24]};
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }

    p + p {
      max-width: 280px;
      margin-top: ${theme.spacing[8]};
      font-size: ${theme.fontSize.caption.size};
      line-height: ${theme.fontSize.caption.lineheight};
    }
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    min-height: 340px;
    padding-inline: ${theme.spacing[8]};
  }
`;

export const CategorySection = styled.section`
  margin-bottom: ${theme.spacing[20]};
  padding: ${theme.spacing[16]};

  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};

  background: ${theme.colors.white};
`;

export const CategoryTitle = styled.h2`
  margin: 0 0 ${theme.spacing[12]};

  color: ${theme.colors.primary};

  font-size: ${theme.fontSize.h6.size};
  line-height: ${theme.fontSize.h6.lineheight};
  font-weight: ${theme.fontWeight.bold};
`;

export const CartItem = styled.article`
  position: relative;

  display: grid;

  grid-template-columns:
    18px
    92px
    minmax(140px, 1fr)
    110px
    100px;

  gap: ${theme.spacing[16]};
  align-items: center;

  padding: ${theme.spacing[14]};

  border: 1px solid ${theme.colors.border};
  border-radius: 12px;

  background: ${theme.colors.white};

  & + & {
    margin-top: ${theme.spacing[12]};
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns:
      16px
      76px
      minmax(0, 1fr)
      auto
      auto;

    gap: ${theme.spacing[8]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    display: grid;

    grid-template-columns: 76px minmax(0, 1fr);

    grid-template-areas:
      "image info"
      "quantity price";

    column-gap: ${theme.spacing[12]};
    row-gap: ${theme.spacing[12]};

    padding: ${theme.spacing[40]} ${theme.spacing[16]} ${theme.spacing[16]};

    align-items: start;
  }
`;

export const ItemImage = styled.img`
  width: 92px;
  height: 72px;

  object-fit: cover;

  border-radius: 8px;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 76px;
    height: 64px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-area: image;

    width: 76px;
    height: 76px;

    align-self: center;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${theme.spacing[4]};

  min-width: 0;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-area: info;

    align-self: center;

    min-width: 0;
  }
`;

export const ItemName = styled.h3`
  margin: 0;

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.body.size};
  font-weight: ${theme.fontWeight.bold};

  word-break: keep-all;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: 20px;
  }
`;

export const ItemText = styled.p`
  margin: 0;

  color: ${theme.colors.textSecondary};

  font-size: ${theme.fontSize.caption.size};
  line-height: ${theme.fontSize.caption.lineheight};
`;

export const ItemPriceArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  min-width: 0;
  min-height: 68px;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-area: price;

    justify-self: end;
    align-self: end;

    min-height: auto;
  }
`;
export const ItemTotal = styled.strong`
  margin-top: auto;

  white-space: nowrap;

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.body.size};
  font-weight: ${theme.fontWeight.bold};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    margin-top: auto;
    padding-top: 28px;

    font-size: ${theme.fontSize.bodysmall.size};
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22px;
  height: 22px;

  padding: 0;

  border: 1px solid ${theme.colors.border};
  border-radius: 4px;

  background: ${theme.colors.white};
  color: ${theme.colors.textSecondary};

  cursor: pointer;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    position: absolute;
    top: ${theme.spacing[12]};
    right: ${theme.spacing[12]};

    width: 20px;
    height: 20px;

    font-size: 12px;
  }
`;

export const ContinueShoppingButton = styled.button`
  width: 100%;
  height: 44px;

  border: 1px solid ${theme.colors.primary};
  border-radius: 10px;

  background: ${theme.colors.white};
  color: ${theme.colors.primary};

  font-size: ${theme.fontSize.body.size};
  font-weight: ${theme.fontWeight.bold};

  cursor: pointer;

  &:hover {
    background: ${theme.colors.background2};
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-area: quantity;

    justify-self: start;
    align-self: center;
  }
`;

export const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  padding: 0;

  border: 1px solid ${theme.colors.secondary};
  border-radius: 4px;

  background: ${theme.colors.white};

  color: ${theme.colors.primary};

  font-size: ${theme.fontSize.bodysmall.size};

  cursor: pointer;

  &:hover {
    background: ${theme.colors.background2};
  }
`;

export const Quantity = styled.span`
  min-width: 38px;

  text-align: center;

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.bodysmall.size};
  font-weight: ${theme.fontWeight.medium};
`;

export const OrderSummary = styled.aside`
  position: sticky;
  top: ${theme.spacing[24]};

  padding: ${theme.spacing[24]};

  border: 1px solid ${theme.colors.border};
  border-radius: 12px;

  background: ${theme.colors.white};

  box-shadow: 0 4px 14px rgba(44, 62, 53, 0.06);

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    position: static;
  }
`;

export const SummaryTitle = styled.h2`
  margin: 0 0 ${theme.spacing[20]};
  padding-bottom: ${theme.spacing[20]};

  border-bottom: 1px solid ${theme.colors.border};

  text-align: center;

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.h5.size};
  line-height: ${theme.fontSize.h5.lineheight};
  font-weight: ${theme.fontWeight.bold};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${theme.spacing[10]};

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};

  span {
    font-weight: ${theme.fontWeight.medium};
  }

  strong {
    color: ${theme.colors.textSecondary};
    font-weight: ${theme.fontWeight.regular};
  }
`;

export const Divider = styled.hr`
  margin: ${theme.spacing[20]} 0;

  border: 0;
  border-top: 1px solid ${theme.colors.border};
`;

export const BenefitArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};
`;

export const BenefitTitle = styled.h3`
  margin: 0;

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};
  font-weight: ${theme.fontWeight.bold};
`;

export const BenefitSelect = styled.select`
  width: 100%;
  height: 44px;

  padding: 0 ${theme.spacing[12]};

  border: 1px solid ${theme.colors.border};
  border-radius: 6px;

  outline: none;

  background: ${theme.colors.white};

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.caption.size};
  line-height: ${theme.fontSize.caption.lineheight};

  cursor: pointer;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;
export const TotalArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${theme.spacing[16]};

  > div {
    display: flex;
    align-items: center;
    gap: ${theme.spacing[8]};
  }
`;

export const TotalLabel = styled.span`
  font-size: ${theme.fontSize.h5.size};
  font-weight: ${theme.fontWeight.bold};
`;

export const DiscountInfo = styled.span`
  color: ${theme.colors.error};

  font-size: ${theme.fontSize.caption.size};
  font-weight: ${theme.fontWeight.semiBold};
`;

export const TotalPrice = styled.strong`
  color: ${theme.colors.primary};

  font-size: ${theme.fontSize.h5.size};
  font-weight: ${theme.fontWeight.bold};
`;

export const NoticeArea = styled.div`
  margin-bottom: ${theme.spacing[20]};

  border-top: 1px solid ${theme.colors.border};
`;

export const NoticeButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: ${theme.spacing[16]} 0;

  border: 0;

  background: transparent;

  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};
  font-weight: ${theme.fontWeight.semiBold};

  cursor: pointer;
`;

export const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};

  padding-bottom: ${theme.spacing[16]};

  color: ${theme.colors.textSecondary};

  font-size: ${theme.fontSize.caption.size};
  line-height: ${theme.fontSize.caption.lineheight};

  p {
    margin: 0;
  }
`;

export const PurchaseButton = styled.button`
  width: 100%;
  height: 48px;

  border: 0;
  border-radius: 6px;

  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  font-size: ${theme.fontSize.button.size};
  line-height: ${theme.fontSize.button.lineheight};
  font-weight: ${theme.fontWeight.bold};

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.hover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// 모달

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.35);
`;

export const ModalBox = styled.div`
  width: min(400px, calc(100% - 32px));

  padding: ${theme.spacing[24]};

  border-radius: 16px;

  background: ${theme.colors.white};

  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 ${theme.spacing[12]};

  font-size: ${theme.fontSize.h5.size};
  font-weight: ${theme.fontWeight.bold};
`;

export const ModalText = styled.p`
  margin: 0 0 ${theme.spacing[24]};

  color: ${theme.colors.textSecondary};

  font-size: ${theme.fontSize.body.size};
`;

export const ModalButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[8]};
`;

export const ModalCancelButton = styled.button`
  height: 40px;

  padding: 0 ${theme.spacing[20]};

  border: 1px solid ${theme.colors.border};
  border-radius: 6px;

  background: ${theme.colors.white};
  color: ${theme.colors.textPrimary};

  cursor: pointer;
`;

export const ModalDeleteButton = styled.button`
  height: 40px;

  padding: 0 ${theme.spacing[20]};

  border: 0;
  border-radius: 6px;

  background: ${theme.colors.error};
  color: ${theme.colors.white};

  cursor: pointer;
`;

export const ModalAddButton = styled.button`
  height: 40px;
  padding: 0 ${theme.spacing[20]};

  border: 0;
  border-radius: 6px;

  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};

  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.hover};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const EmptyCartImage = styled.img`
  display: block;
  width: 420px;
  max-width: 100%;
  height: auto;
  flex-shrink: 0;

  object-fit: contain;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 340px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 260px;
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 220px;
  }
`;
