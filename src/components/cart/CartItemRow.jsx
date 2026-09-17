import { useEffect, useState } from "react";
import { getProductById } from "../../api/productApi";

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
  ItemImageLink,
} from "../../pages/CartPage.styles";

import { Link } from "react-router-dom";

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
  const itemType = item.itemType ?? item.type;
  const productId = item.productId ?? item.id;

  const detailPaths = {
    ticket: "/products",
    package: "/products",
    membership: "/products",
    experience: "/experiences",
    goods: "/goods",
  };

  const detailPath = `${detailPaths[itemType]}/${encodeURIComponent(productId)}`;

  const [productInfo, setProductInfo] = useState(null);
  const [descriptionError, setDescriptionError] = useState("");

  const needsProductInfo = itemType === "package" || itemType === "membership";

  useEffect(() => {
    if (!needsProductInfo || productId == null) return;

    const controller = new AbortController();
    let ignore = false;

    setProductInfo(null);
    setDescriptionError("");

    getProductById(productId, controller.signal)
      .then((data) => {
        if (!ignore) setProductInfo(data);
      })
      .catch(() => {
        if (!ignore) {
          setDescriptionError(
            "상품 설명을 불러오지 못했습니다. 상품명을 눌러 상세페이지를 확인해주세요.",
          );
        }
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [productId, itemType, needsProductInfo]);

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
      <ItemImageLink
        as={Link}
        to={detailPath}
        aria-label={`${item.name} 상세페이지`}
      >
        <ItemImage src={item.imageUrl} alt={item.name} />
      </ItemImageLink>

      {/* 상품 기본 정보 */}
      <ItemInfo>
        <ItemName>
          <Link
            to={detailPath}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {item.name}
          </Link>
        </ItemName>

        {/* 입장권/체험권 이용일 표시 */}
        {item.type !== "goods" && item.visitDate && (
          <ItemText>이용일: {item.visitDate}</ItemText>
        )}

        {/* 입장권 정보 */}
        {(item.type === "ticket" || item.type === "experience") && (
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

        {/* 패키지·멤버십 정보 */}
        {needsProductInfo && (
          <>
            {item.option && <ItemText>선택 옵션: {item.option}</ItemText>}

            <ItemText>
              수량: {item.quantity}
              {itemType === "package" ? "개" : "매"}
            </ItemText>

            <ItemText>
              {item.price.toLocaleString()}원 /{" "}
              {itemType === "package" ? "1인" : "1매"}
            </ItemText>
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
