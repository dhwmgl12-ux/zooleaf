import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    name,
    price,
    discountRate,
    discountPrice,
    thumbnailImage,
    badge = [],
    id,
  } = product ?? {};

  const hasDiscount =
    discountRate > 0 &&
    discountPrice !== null &&
    discountPrice !== undefined;

  return (
    <article>
      <div>
        {thumbnailImage ? (
          <img src={thumbnailImage} alt={name} />
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

        <h3>{name || '상품명'}</h3>

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

        <button
          type="button"
          onClick={() => navigate(`/products/${id}`)}
        >
          예매
        </button>
      </div>
    </article>
  );
}