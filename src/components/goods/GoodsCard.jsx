import { Link } from "react-router-dom";
import { GoodsCardContainer } from "./GoodsCard.styles";

export default function GoodsCard({ goods }) {
  const name = goods?.name || "상품명";
  const {
    id,
    imageUrl,
    price = 0,
    discountRate,
    discountPrice,
    badge = [],
  } = goods ?? {};

  const hasDiscount =
    discountRate > 0 && discountPrice !== null && discountPrice !== undefined;
  const discountPercent = Math.round(discountRate * 100);
  const isUnitPrice = name.includes("미러") || name.includes("키링");

  //
  // 기존 장바구니 추가 함수와 요청 상태 가져오기
  const addToCart = useCartStore((state) => state.addToCart);
  const isUpdating = useCartStore((state) => state.isUpdating);
  const isLoading = useCartStore((state) => state.isLoading);

  // 현재 카드의 굿즈를 1개 담기
  const handleTestAdd = async () => {
    const success = await addToCart({
      itemType: "goods",
      productId: id,
      quantity: 1,
      option: null,
    });

    if (success) {
      window.alert("장바구니에 담았습니다! /cart에서 확인해 주세요.");
    } else {
      window.alert(
        useCartStore.getState().error ||
          "처리 중입니다. 잠시 후 다시 시도해 주세요.",
      );
    }
  };
  //

  return (
    <GoodsCardContainer>
      <Link className="goods-card__link" to={`/goods/${id}`}>
        <div className="goods-card__image">
          {imageUrl ? (
            <img src={imageUrl} alt={name} />
          ) : (
            <span aria-hidden="true">상품 이미지</span>
          )}
          {badge.length > 0 && (
            <ul className="goods-card__badges" aria-label="상품 혜택">
              {badge.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="goods-card__content">
          <h3>{name}</h3>
          {hasDiscount ? (
            <div className="goods-card__price">
              <div>
                <del>₩ {price.toLocaleString()}</del>
                <span>-{discountPercent}%</span>
              </div>
              <strong>
                {isUnitPrice && "(개당) "}₩ {discountPrice.toLocaleString()}
              </strong>
            </div>
          ) : (
            <strong className="goods-card__single-price">
              {isUnitPrice && "(개당) "}₩ {price.toLocaleString()}
            </strong>
          )}
        </div>
      </Link>
    </GoodsCardContainer>
  );
}
