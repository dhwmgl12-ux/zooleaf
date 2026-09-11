import { Link } from 'react-router-dom';
import zooleafCardLogo from '../../assets/images/zooleaf-logo-1.webp';
import { ProductCardContainer } from './ProductCard.styles';

const PRODUCT_CARD_BACKGROUNDS = {
  나이트: '#2C3E35',
  패밀리: '#F1EEE2',
  커플: '#FEEBF8',
  드림: '#E2EDF1',
  멤버십: '#FFF891',
};

function getCardBackground(name) {
  if (name.includes('Annual Membership')) {
    return PRODUCT_CARD_BACKGROUNDS.멤버십;
  }

  const match = Object.entries(PRODUCT_CARD_BACKGROUNDS).find(([keyword]) => name.includes(keyword));
  return match?.[1] ?? '#FFFFFF';
}

function getProductName(name) {
  const productName = name.replace('ZOOLEAF ', '');

  if (productName === 'Annual Membership') {
    return '연간 멤버십';
  }

  const ticketName = productName.match(/^(대인|소인|우대) (종일권|오후권)$/);
  if (ticketName) {
    return `${ticketName[2]} ${ticketName[1]}`;
  }

  return productName;
}

export default function ProductCard({ product }) {
  const name = product?.name || '상품명';
  const displayName = getProductName(name);
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
  } = product ?? {};

  const hasDiscount =
    discountRate > 0 &&
    discountPrice !== null &&
    discountPrice !== undefined;

  return (
    <ProductCardContainer
      $background={getCardBackground(name)}
      $isDark={name.includes('나이트')}
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

        <Link className="product-card__button" to={`/products/${id}`}>
          예매하기
        </Link>
      </div>
    </ProductCardContainer>
  );
}
