export default function ProductCard({ product }) {
  const {
    name,
    price,
    discountRate,
    discountPrice,
    thumbnailImage,
    badge = [],
  } = product ?? {};

  const hasDiscount =
    discountRate > 0 &&
    discountPrice !== null &&
    discountPrice !== undefined;

  return (
    <article>
      {/* 상품 이미지 */}
      <div>
        {thumbnailImage ? (
          <img src={thumbnailImage} alt={name} />
        ) : (
          <span aria-hidden="true">상품 이미지</span>
        )}
      </div>

      {/* 상품 정보 */}
      <div>
        {/* 상품 배지 */}
        {badge.length > 0 && (
          <ul aria-label="상품 혜택">
            {badge.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {/* 상품명 */}
        <h3>{name || '상품명'}</h3>

        {/* 가격 */}
        {hasDiscount ? (
          <div>
            <span>{discountRate}%</span>

            <strong>
              {discountPrice.toLocaleString()}원
            </strong>

            <del>{price.toLocaleString()}원</del>
          </div>
        ) : (
          <strong>
            {price?.toLocaleString() || '0'}원
          </strong>
        )}

        {/* 상품 이동 */}
        <button type="button">
          예매
        </button>
      </div>
    </article>
  );
}