import { useState } from "react";
import useCartStore from "../store/cartStore";
import emptyCartImage from "../assets/images/cart-empty.webp";
import { useNavigate } from "react-router-dom";

import { getCart, updateCartQuantity, deleteCartItem } from "../api/cartApi";

import {
  Container,
  Title,
  CartTopBar,
  EmptyCartImage,
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
  ContinueShoppingButton,
  OrderSummary,
  SummaryTitle,
  SummaryRow,
  Divider,
  BenefitArea,
  BenefitTitle,
  BenefitSelect,
  TotalArea,
  TotalLabel,
  DiscountInfo,
  TotalPrice,
  NoticeArea,
  NoticeButton,
  NoticeContent,
  PurchaseButton,
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalDeleteButton,
} from "./CartPage.styles";

function CartPage() {
  // Zustand 장바구니 전역 상태와 수량 변경/삭제 기능 가져오기
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  // 다른 페이지로 이동할 때 사용하는 함수
  const navigate = useNavigate();

  // 상품 분류
  const ticketItems = cartItems.filter((item) => item.type === "ticket");

  const experienceItems = cartItems.filter(
    (item) => item.type === "experience",
  );

  const goodsItems = cartItems.filter((item) => item.type === "goods");

  // 선택된 상품 관리
  const [selectedItems, setSelectedItems] = useState([]);

  // 삭제 모달 상태 관리
  const [deleteModal, setDeleteModal] = useState({
    open: false, // 모달이 열려있는지 여부
    mode: null, // 개별 삭제인지 선택 삭제인지 구분
    item: null, // 개별 삭제할 상품 정보
  });

  // 상품마다 고유한 key 생성(같은 id라도 상품 종류와 옵션이 다를 수 있어서 고유한 식별값 생성)
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

  // 개별 상품 삭제 모달 열기
  const handleDelete = (item) => {
    setDeleteModal({
      open: true,
      mode: "single",
      item,
    });
  };

  // 선택 상품 삭제 모달 열기
  const handleOpenDeleteModal = () => {
    if (selectedItems.length === 0) return;

    setDeleteModal({
      open: true,
      mode: "selected",
      item: null,
    });
  };

  // 모달 닫기
  const handleCloseDeleteModal = () => {
    setDeleteModal({
      open: false,
      mode: null,
      item: null,
    });
  };

  // 실제 삭제 실행
  const handleConfirmDelete = () => {
    // 개별 상품 삭제
    if (deleteModal.mode === "single" && deleteModal.item) {
      const item = deleteModal.item;

      removeFromCart(item.id, item.type);

      setSelectedItems((prev) =>
        prev.filter((key) => key !== getItemKey(item)),
      );
    }

    // 선택 상품 삭제
    if (deleteModal.mode === "selected") {
      cartItems.forEach((item) => {
        if (selectedItems.includes(getItemKey(item))) {
          removeFromCart(item.id, item.type);
        }
      });

      setSelectedItems([]);
    }
    // 삭제 후 모달 닫기
    handleCloseDeleteModal();
  };

  // 결제 금액

  const productTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // 기존 상품 자체 할인
  const itemDiscountTotal = cartItems.reduce((sum, item) => {
    const discountRate = item.discountRate ?? 0;

    return sum + item.price * discountRate * item.quantity;
  }, 0);

  // 결제 혜택

  const [benefitRate, setBenefitRate] = useState(0);

  const benefitDiscount = productTotal * benefitRate;

  const discountTotal = itemDiscountTotal + benefitDiscount;

  // 배송비

  const hasGoods = goodsItems.length > 0;

  const shippingFee = hasGoods ? 3000 : 0;

  // 최종 금액

  const finalTotal = Math.max(0, productTotal - discountTotal + shippingFee);

  // 유의사항 아코디언

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
          onClick={handleOpenDeleteModal}
        >
          선택 삭제
        </SelectDeleteButton>
      </CartTopBar>

      <CartLayout>
        <CartContent>
          {cartItems.length === 0 ? (
            <EmptyCart>
              <EmptyCartImage src={emptyCartImage} alt="빈 장바구니" />
              <p>장바구니에 담긴 상품이 없습니다</p>

              <p>다양한 상품들과 굿즈를 둘러보고 쇼핑의 즐거움을 만나보세요</p>
            </EmptyCart>
          ) : (
            <>
              {/* 입장권 */}

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
                        {item.visitDate && (
                          <ItemText>이용일: {item.visitDate}</ItemText>
                        )}

                        <ItemText>인원: {item.quantity}명</ItemText>

                        <ItemText>
                          {item.price.toLocaleString()}원 / 1인
                        </ItemText>
                      </ItemInfo>

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

                      <ItemPriceArea>
                        <DeleteButton
                          type="button"
                          aria-label="상품 삭제"
                          onClick={() => handleDelete(item)}
                        >
                          x
                        </DeleteButton>

                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}

              {/* 체험권 */}
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
                      </ItemInfo>

                      <QuantityControl>
                        <QuantityButton
                          type="button"
                          onClick={() => decreaseQuantity(item.id, item.type)}
                        >
                          -
                        </QuantityButton>

                        <Quantity>{item.quantity}</Quantity>

                        <QuantityButton
                          type="button"
                          onClick={() => increaseQuantity(item.id, item.type)}
                        >
                          +
                        </QuantityButton>
                      </QuantityControl>

                      <ItemPriceArea>
                        <DeleteButton
                          type="button"
                          aria-label="상품 삭제"
                          onClick={() => handleDelete(item)}
                        >
                          x
                        </DeleteButton>
                        <ItemTotal>
                          {(item.price * item.quantity).toLocaleString()}원
                        </ItemTotal>
                      </ItemPriceArea>
                    </CartItem>
                  ))}
                </CategorySection>
              )}

              {/* 굿즈 */}
            </>
          )}
        </CartContent>
      </CartLayout>
    </Container>
  );
}

export default CartPage;
