import { Link } from 'react-router-dom';
import zooleafCardLogo from '../../assets/images/zooleaf-logo-1.webp';
import { ProductCardContainer } from './ProductCard.styles';

export default function ProductCard({ product }) {
  const displayName = product?.displayName || product?.name || '상품명';
  const nameParts = displayName.split(' ');
  const hasEmphasizedLastWord =
    /^(종일권|오후권) (대인|소인|우대)$/.test(displayName) ||
    displayName === '연간 멤버십';

  const {
    price,
    discountRate,
    discountPrice,
    badge = [],
    id,
    cardVariant = 'default',
  } = product ?? {};

  const hasDiscount =
    discountRate > 0 &&
    discountPrice !== null &&
    discountPrice !== undefined;

  return (
    <ProductCardContainer
      as={Link}
      to={`/products/${id}`}
      $variant={cardVariant}
    >
      <div className="product-card__content">
        <img className="product-card__logo" src={zooleafCardLogo} alt="ZOOLEAF" />
        {badge.length > 0 && (
          <ul aria-label="상품 혜택">
            {badge.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <h3>
          {hasEmphasizedLastWord ? (
            <>
              {nameParts.slice(0, -1).join(' ')} <span>{nameParts.at(-1)}</span>
            </>
          ) : (
            displayName
          )}
        </h3>

        {hasDiscount ? (
          <strong>{discountPrice.toLocaleString()}원</strong>
        ) : (
          <strong>
            {price?.toLocaleString() || '0'}원
          </strong>
        )}

        <span className="product-card__button">예매하기</span>
      </div>
    </ProductCardContainer>
  );
}
