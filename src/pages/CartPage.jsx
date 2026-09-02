import useCartStore from "../store/cartStore";

import {
  Container,
  Title,
  CartLayout,
  CartContent,
  EmptyCart,
  CategorySection,
  CategoryTitle,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemText,
  ItemPriceArea,
  ItemTotal,
  DeleteButton,
  QuantityControl,
  QuantityButton,
  Quantity,
  OrderSummary,
  SummaryTitle,
  SummaryRow,
  Divider,
  TotalRow,
  PurchaseButton,
} from "./CartPage.styles";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const ticketItems = cartItems.filter((item) => item.type === "ticket");

  const experienceItems = cartItems.filter(
    (item) => item.type === "experience",
  );

  const goodsItems = cartItems.filter((item) => item.type === "goods");

  const productTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const discountTotal = cartItems.reduce((sum, item) => {
    const discountRate = item.discountRate ?? 0;

    return sum + item.price * discountRate * item.quantity;
  }, 0);

  const hasGoods = goodsItems.length > 0;
  const shippingFee = hasGoods ? 3000 : 0;

  const finalTotal = productTotal - discountTotal + shippingFee;

  return (
    <Container>
      <Title>장바구니</Title>

      <CartLayout>
        <CartContent>
          {cartItems.length === 0 ? (
            <EmptyCart>
              <p>장바구니에 담긴 상품이 없습니다.</p>
            </EmptyCart>
          ) : (
            <>
              {ticketItems.length > 0 && (
                <CategorySection>
                  <CategoryTitle>입장권 항목</CategoryTitle>

                  {ticketItems.map((item) => (
                    <CartItem key={`${item.type}-${item.id}`}>
                      <ItemImage src={item.imageUrl} alt={item.name} />

                      <ItemInfo>
                        <ItemName>{item.name}</ItemName>

                        {item.visitDate && (
                          <ItemText>이용일: {item.visitDate}</ItemText>
                        )}

                        <ItemText>인원: {item.quantity}명</ItemText>

                        <ItemText>
                          {item.price.toLocaleString()}원 / 1인
                        </ItemText>
                      </ItemInfo>

                      <ItemPriceArea>
                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>

                        <DeleteButton
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          삭제
                        </DeleteButton>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}

              {experienceItems.length > 0 && (
                <CategorySection>
                  <CategoryTitle>체험권 항목</CategoryTitle>

                  {experienceItems.map((item) => (
                    <CartItem key={`${item.type}-${item.id}`}>
                      <ItemImage src={item.imageUrl} alt={item.name} />

                      <ItemInfo>
                        <ItemName>{item.name}</ItemName>

                        {item.visitDate && (
                          <ItemText>이용일: {item.visitDate}</ItemText>
                        )}

                        {item.time && <ItemText>시간: {item.time}</ItemText>}

                        <ItemText>인원: {item.quantity}명</ItemText>
                      </ItemInfo>

                      <ItemPriceArea>
                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>

                        <DeleteButton
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          삭제
                        </DeleteButton>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}

              {goodsItems.length > 0 && (
                <CategorySection>
                  <CategoryTitle>굿즈 항목</CategoryTitle>

                  {goodsItems.map((item) => (
                    <CartItem
                      key={`${item.type}-${item.id}-${item.option ?? ""}`}
                    >
                      <ItemImage src={item.imageUrl} alt={item.name} />

                      <ItemInfo>
                        <ItemName>{item.name}</ItemName>

                        {item.option && (
                          <ItemText>옵션: {item.option}</ItemText>
                        )}

                        <ItemText>{item.price.toLocaleString()}원</ItemText>

                        <QuantityControl>
                          <QuantityButton
                            onClick={() => decreaseQuantity(item.id, item.type)}
                          >
                            -
                          </QuantityButton>

                          <Quantity>{item.quantity}</Quantity>

                          <QuantityButton
                            onClick={() => increaseQuantity(item.id, item.type)}
                          >
                            +
                          </QuantityButton>
                        </QuantityControl>
                      </ItemInfo>

                      <ItemPriceArea>
                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>

                        <DeleteButton
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          삭제
                        </DeleteButton>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}
            </>
          )}
        </CartContent>

        <OrderSummary>
          <SummaryTitle>구매 하기</SummaryTitle>

          <SummaryRow>
            <span>상품 금액</span>
            <strong>{productTotal.toLocaleString()}원</strong>
          </SummaryRow>

          <SummaryRow>
            <span>할인 금액</span>
            <strong>-{discountTotal.toLocaleString()}원</strong>
          </SummaryRow>

          <SummaryRow>
            <span>배송비</span>
            <strong>{shippingFee.toLocaleString()}원</strong>
          </SummaryRow>

          <Divider />

          <TotalRow>
            <span>총 금액</span>
            <strong>{finalTotal.toLocaleString()}원</strong>
          </TotalRow>

          <PurchaseButton disabled={cartItems.length === 0}>
            구매하기
          </PurchaseButton>
        </OrderSummary>
      </CartLayout>
    </Container>
  );
}

export default CartPage;
