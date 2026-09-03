import { useState } from "react";
import useCartStore from "../store/cartStore";

import {
  Container,
  Title,
  CartTopBar,
  SelectAllLabel,
  SelectDeleteButton,
  CartLayout,
  CartContent,
  EmptyCart,
  CategorySection,
  CategoryTitle,
  CartItem,
  CheckBox,
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
  BenefitArea,
  BenefitTitle,
  BenefitSelect,
  TotalRow,
  NoticeArea,
  NoticeButton,
  NoticeContent,
  PurchaseButton,
} from "./CartPage.styles";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  // =========================
  // 상품 분류
  // =========================

  const ticketItems = cartItems.filter((item) => item.type === "ticket");

  const experienceItems = cartItems.filter(
    (item) => item.type === "experience",
  );

  const goodsItems = cartItems.filter((item) => item.type === "goods");

  // =========================
  // 상품 선택
  // =========================

  const [selectedItems, setSelectedItems] = useState([]);

  // 상품마다 고유한 key 생성
  const getItemKey = (item) => `${item.type}-${item.id}-${item.option ?? ""}`;

  // 상품 하나 선택 / 선택 해제
  const handleItemSelect = (item) => {
    const itemKey = getItemKey(item);

    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((key) => key !== itemKey)
        : [...prev, itemKey],
    );
  };

  // 모든 상품이 선택됐는지 확인
  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  // 전체 선택 / 전체 해제
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      return;
    }

    setSelectedItems(cartItems.map((item) => getItemKey(item)));
  };

  // 선택 상품 삭제
  const handleSelectedDelete = () => {
    cartItems.forEach((item) => {
      if (selectedItems.includes(getItemKey(item))) {
        removeFromCart(item.id, item.type);
      }
    });

    setSelectedItems([]);
  };

  // 개별 상품 삭제
  const handleDelete = (item) => {
    removeFromCart(item.id, item.type);

    setSelectedItems((prev) => prev.filter((key) => key !== getItemKey(item)));
  };

  // =========================
  // 결제 금액
  // =========================

  const productTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // 기존 상품 자체 할인
  const itemDiscountTotal = cartItems.reduce((sum, item) => {
    const discountRate = item.discountRate ?? 0;

    return sum + item.price * discountRate * item.quantity;
  }, 0);

  // =========================
  // 결제 혜택
  // =========================

  const [benefitRate, setBenefitRate] = useState(0);

  const benefitDiscount = productTotal * benefitRate;

  const discountTotal = itemDiscountTotal + benefitDiscount;

  // =========================
  // 배송비
  // =========================

  const hasGoods = goodsItems.length > 0;

  const shippingFee = hasGoods ? 3000 : 0;

  // =========================
  // 최종 금액
  // =========================

  const finalTotal = Math.max(0, productTotal - discountTotal + shippingFee);

  // =========================
  // 유의사항 아코디언
  // =========================

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  return (
    <Container>
      <Title>장바구니</Title>

      {/* 전체 선택 / 선택 삭제 */}
      <CartTopBar>
        <SelectAllLabel>
          <CheckBox
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
          />
          전체 선택 ({selectedItems.length} / {cartItems.length})
        </SelectAllLabel>

        <SelectDeleteButton
          type="button"
          disabled={selectedItems.length === 0}
          onClick={handleSelectedDelete}
        >
          선택 삭제
        </SelectDeleteButton>
      </CartTopBar>

      <CartLayout>
        <CartContent>
          {cartItems.length === 0 ? (
            <EmptyCart>
              <p>장바구니에 담긴 상품이 없습니다.</p>
            </EmptyCart>
          ) : (
            <>
              {/* =========================
                  입장권
              ========================= */}

              {ticketItems.length > 0 && (
                <CategorySection>
                  <CategoryTitle>입장권 항목</CategoryTitle>

                  {ticketItems.map((item) => (
                    <CartItem key={getItemKey(item)}>
                      <CheckBox
                        type="checkbox"
                        checked={selectedItems.includes(getItemKey(item))}
                        onChange={() => handleItemSelect(item)}
                      />

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
                        <DeleteButton
                          type="button"
                          aria-label="상품 삭제"
                          onClick={() => handleDelete(item)}
                        >
                          ×
                        </DeleteButton>

                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}

              {/* =========================
                  체험권
              ========================= */}

              {experienceItems.length > 0 && (
                <CategorySection>
                  <CategoryTitle>체험권 항목</CategoryTitle>

                  {experienceItems.map((item) => (
                    <CartItem key={getItemKey(item)}>
                      <CheckBox
                        type="checkbox"
                        checked={selectedItems.includes(getItemKey(item))}
                        onChange={() => handleItemSelect(item)}
                      />

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
                        <DeleteButton
                          type="button"
                          aria-label="상품 삭제"
                          onClick={() => handleDelete(item)}
                        >
                          ×
                        </DeleteButton>

                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}

              {/* =========================
                  굿즈
              ========================= */}

              {goodsItems.length > 0 && (
                <CategorySection>
                  <CategoryTitle>굿즈 항목</CategoryTitle>

                  {goodsItems.map((item) => (
                    <CartItem key={getItemKey(item)}>
                      <CheckBox
                        type="checkbox"
                        checked={selectedItems.includes(getItemKey(item))}
                        onChange={() => handleItemSelect(item)}
                      />

                      <ItemImage src={item.imageUrl} alt={item.name} />

                      <ItemInfo>
                        <ItemName>{item.name}</ItemName>

                        {item.option && (
                          <ItemText>옵션: {item.option}</ItemText>
                        )}

                        <ItemText>{item.price.toLocaleString()}원</ItemText>

                        {/* 굿즈만 수량 변경 */}
                        <QuantityControl>
                          <QuantityButton
                            type="button"
                            onClick={() => decreaseQuantity(item.id, item.type)}
                          >
                            −
                          </QuantityButton>

                          <Quantity>{item.quantity}</Quantity>

                          <QuantityButton
                            type="button"
                            onClick={() => increaseQuantity(item.id, item.type)}
                          >
                            +
                          </QuantityButton>
                        </QuantityControl>
                      </ItemInfo>

                      <ItemPriceArea>
                        <DeleteButton
                          type="button"
                          aria-label="상품 삭제"
                          onClick={() => handleDelete(item)}
                        >
                          ×
                        </DeleteButton>

                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}
            </>
          )}
        </CartContent>

        {/* =========================
            구매하기
        ========================= */}

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

          {/* 결제 혜택 */}
          <BenefitArea>
            <BenefitTitle>결제 혜택</BenefitTitle>

            <BenefitSelect
              value={benefitRate}
              onChange={(e) => setBenefitRate(Number(e.target.value))}
            >
              <option value={0}>할인 혜택을 선택해주세요.</option>

              <option value={0.5}>ZooLeaf 제휴카드 - 최대 50%</option>

              <option value={0.4}>통신사 멤버십 - 40%</option>

              <option value={0.3}>문화 누리 카드 - 30%</option>

              <option value={0.3}>문화가 있는 날 - 30%</option>
            </BenefitSelect>
          </BenefitArea>

          <Divider />

          <TotalRow>
            <span>총 금액</span>

            <strong>{finalTotal.toLocaleString()}원</strong>
          </TotalRow>

          {/* 유의사항 */}
          <NoticeArea>
            <NoticeButton
              type="button"
              onClick={() => setIsNoticeOpen((prev) => !prev)}
            >
              <span>유의 사항</span>

              <span>{isNoticeOpen ? "▲" : "▼"}</span>
            </NoticeButton>

            {isNoticeOpen && (
              <NoticeContent>
                <p>· 할인 혜택은 다른 할인과 중복 적용되지 않을 수 있습니다.</p>

                <p>
                  · 입장권 및 체험권은 지정된 이용일에만 사용할 수 있습니다.
                </p>

                <p>· 굿즈가 포함된 주문에는 배송비가 추가될 수 있습니다.</p>

                <p>
                  · 결제 완료 후 취소 및 환불은 상품별 정책에 따라 처리됩니다.
                </p>
              </NoticeContent>
            )}
          </NoticeArea>

          <PurchaseButton type="button" disabled={cartItems.length === 0}>
            구매하기
          </PurchaseButton>
        </OrderSummary>
      </CartLayout>
    </Container>
  );
}

export default CartPage;
