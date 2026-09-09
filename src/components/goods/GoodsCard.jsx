import { Link } from 'react-router-dom';

export default function GoodsCard({ goods }) {
  const name = goods?.name || '상품명';
  const {
    id,
    imageUrl,
    price = 0,
    discountRate,
    discountPrice,
    badge = [],
  } = goods ?? {};

  const hasDiscount =
    discountRate > 0 &&
    discountPrice !== null &&
    discountPrice !== undefined;
  const discountPercent = Math.round(discountRate * 100);

  return (
    <article>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <span aria-hidden="true">상품 이미지</span>
        )}
      </div>

      <div>
        {badge.length > 0 && (
          <ul aria-label="상품 혜택">
            {badge.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <h3>{name}</h3>

        {hasDiscount ? (
          <div>
            <span>{discountPercent}%</span>
            <strong>{discountPrice.toLocaleString()}원</strong>
            <del>{price.toLocaleString()}원</del>
          </div>
        ) : (
          <strong>{price.toLocaleString()}원</strong>
        )}

        <Link to={`/goods/${id}`}>상품 보기</Link>
      </div>
    </article>
  );
}
