import {
  CartItem, CheckBox, ItemImage, ItemInfo, ItemName, ItemText,
  QuantityControl, QuantityButton, Quantity,
  ItemPriceArea, DeleteButton, ItemTotal,
} from "../../pages/CartPage.styles";

export default function CartItemRow({ item, disabled, selected, onSelect, onIncrease, onDecrease, onDelete }) {
  return (
    <CartItem>
      <CheckBox type="checkbox" checked={selected} onChange={onSelect} aria-label={`${item.name} 선택`} />
      <ItemImage src={item.imageUrl} alt={item.name} />
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        {item.type !== "goods" && item.visitDate && <ItemText>이용일: {item.visitDate}</ItemText>}
        {item.type === "ticket" && (
          <>
            <ItemText>인원: {item.quantity}명</ItemText>
            <ItemText>{item.price.toLocaleString()}원 / 1인</ItemText>
          </>
        )}
        {item.type === "experience" && item.time && <ItemText>시간: {item.time}</ItemText>}
        {item.type === "goods" && (
          <>
            {item.option && <ItemText>옵션: {item.option}</ItemText>}
            <ItemText>{item.price.toLocaleString()}원</ItemText>
          </>
        )}
      </ItemInfo>
      <QuantityControl>
        <QuantityButton type="button" disabled={disabled || item.quantity <= 1} onClick={onDecrease} aria-label={`${item.name} 수량 감소`}>−</QuantityButton>
        <Quantity>{item.quantity}</Quantity>
        <QuantityButton type="button" disabled={disabled} onClick={onIncrease} aria-label={`${item.name} 수량 증가`}>+</QuantityButton>
      </QuantityControl>
      <ItemPriceArea>
        <DeleteButton type="button" aria-label="상품 삭제" disabled={disabled} onClick={onDelete}>x</DeleteButton>
        <ItemTotal>{(item.price * item.quantity).toLocaleString()}원</ItemTotal>
      </ItemPriceArea>
    </CartItem>
  );
}

