import {
  CartItem,
  CheckBox,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemText,
  QuantityControl,
  QuantityButton,
  Quantity,
  ItemPriceArea,
  DeleteButton,
  ItemTotal,
} from "../../pages/CartPage.styles";

// 장바구니 상품 1개의 정보를 보여주는 컴포넌트
export default function CartItemRow({
  item,
  disabled,
  selected,
  onSelect,
  onIncrease,
  onDecrease,
  onDelete,
}) {
  return (
    <CartItem>
      {/* 상품 선택 체크박스 */}
      <CheckBox
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        aria-label={`${item.name} 선택`}
      />
      {/* 상품 이미지 */}
      <ItemImage src={item.imageUrl} alt={item.name} />

      {/* 상품 기본 정보 */}
      <ItemInfo>
        <ItemName>{item.name}</ItemName>

        {/* 입장권/체험권 이용일 표시 */}
        {item.type !== "goods" && item.visitDate && (
          <ItemText>이용일: {item.visitDate}</ItemText>
        )}

        {/* 입장권 정보 */}
        {item.type === "ticket" && (
          <>
            <ItemText>인원: {item.quantity}명</ItemText>
            <ItemText>{item.price.toLocaleString()}원 / 1인</ItemText>
          </>
        )}

        {/* 체험권 시간 표시 */}
        {item.type === "experience" && item.time && (
          <ItemText>시간: {item.time}</ItemText>
        )}

        {/* 굿즈 옵션 및 가격 표시 */}
        {item.type === "goods" && (
          <>
            {item.option && <ItemText>옵션: {item.option}</ItemText>}
            <ItemText>{item.price.toLocaleString()}원</ItemText>
          </>
        )}
      </ItemInfo>

      {/* 상품 수량 조절 */}
      <QuantityControl>
        <QuantityButton
          type="button"
          disabled={disabled || item.quantity <= 1}
          onClick={onDecrease}
          aria-label={`${item.name} 수량 감소`}
        >
          −
        </QuantityButton>

        <Quantity>{item.quantity}</Quantity>

        <QuantityButton
          type="button"
          disabled={disabled}
          onClick={onIncrease}
          aria-label={`${item.name} 수량 증가`}
        >
          +
        </QuantityButton>
      </QuantityControl>

      {/* 상품 삭제 및 총 가격 */}
      <ItemPriceArea>
        <DeleteButton
          type="button"
          aria-label="상품 삭제"
          disabled={disabled}
          onClick={onDelete}
        >
          x
        </DeleteButton>
        <ItemTotal>{(item.price * item.quantity).toLocaleString()}원</ItemTotal>
      </ItemPriceArea>
    </CartItem>
  );
}
