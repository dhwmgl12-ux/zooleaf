import { Link } from 'react-router-dom';
import { GoodsCardContainer } from './GoodsCard.styles';

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
  const isUnitPrice = name.includes('미러') || name.includes('키링');

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
            <strong>{isUnitPrice && '(개당) '}₩ {discountPrice.toLocaleString()}</strong>
          </div>
        ) : (
          <strong className="goods-card__single-price">
            {isUnitPrice && '(개당) '}₩ {price.toLocaleString()}
          </strong>
        )}
        </div>
      </Link>
    </GoodsCardContainer>
  );
}
