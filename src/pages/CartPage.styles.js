import styled from "@emotion/styled";

export const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 28px;
`;

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
`;

export const CartContent = styled.section``;

export const EmptyCart = styled.div`
  padding: 80px 20px;
  text-align: center;
`;

export const CategorySection = styled.section`
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  background: #ffffff;
`;

export const CategoryTitle = styled.h2`
  margin-bottom: 16px;
  color: #315c4c;
  font-size: 18px;
`;

export const CartItem = styled.article`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  align-items: center;

  padding: 16px;

  border: 1px solid #dddddd;
  border-radius: 8px;
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ItemName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

export const ItemText = styled.p`
  margin: 0;
  color: #777777;
  font-size: 14px;
`;

export const ItemPriceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;

export const ItemTotal = styled.strong`
  font-size: 16px;
`;

export const DeleteButton = styled.button`
  color: #777777;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #91a995;
`;

export const Quantity = styled.span`
  width: 30px;
  text-align: center;
`;

export const OrderSummary = styled.aside`
  padding: 24px;
  border-radius: 12px;
  background: #f7f4ec;
`;

export const SummaryTitle = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const Divider = styled.hr`
  margin: 24px 0;
  border: 0;
  border-top: 1px solid #dddddd;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  color: #315c4c;
  font-size: 18px;
  font-weight: 700;
`;

export const PurchaseButton = styled.button`
  width: 100%;
  height: 48px;

  border-radius: 8px;
  background: #315c4c;
  color: white;

  font-weight: 700;

  &:disabled {
    opacity: 0.4;
  }
`;
