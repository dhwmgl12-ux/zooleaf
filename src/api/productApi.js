import { apiClient } from './client';

const PRODUCT_CARD_VARIANT_RULES = [
  { keyword: '나이트', variant: 'night' },
  { keyword: '패밀리', variant: 'family' },
  { keyword: '커플', variant: 'couple' },
  { keyword: '드림', variant: 'dream' },
  { keyword: 'Annual Membership', variant: 'membership' },
];

const TICKET_DISPLAY_ORDER = [
  '대인 종일권',
  '소인 종일권',
  '우대 종일권',
  '대인 오후권',
  '소인 오후권',
  '우대 오후권',
];

function getDisplayName(name = '') {
  const productName = name.replace('ZOOLEAF ', '');

  if (productName === 'Annual Membership') return '연간 멤버십';

  const ticketName = productName.match(/^(대인|소인|우대) (종일권|오후권)$/);
  return ticketName ? `${ticketName[2]} ${ticketName[1]}` : productName;
}

function getCardVariant(name = '') {
  return PRODUCT_CARD_VARIANT_RULES.find(({ keyword }) => name.includes(keyword))?.variant ?? 'default';
}

function getDisplayOrder(name = '') {
  const ticketOrder = TICKET_DISPLAY_ORDER.indexOf(name.replace('ZOOLEAF ', ''));
  return ticketOrder === -1 ? TICKET_DISPLAY_ORDER.length : ticketOrder;
}

function toProductListItem(product) {
  return {
    ...product,
    cardVariant: getCardVariant(product.name),
    displayName: getDisplayName(product.name),
    displayOrder: getDisplayOrder(product.name),
  };
}

export async function getProducts(options = {}) {
  const params = new URLSearchParams();

  if (options.category) {
    params.append("category", options.category);
  }

  if (options.visitorType) {
    params.append("visitorType", options.visitorType);
  }

  if (options.availableTimeType) {
    params.append("availableTimeType", options.availableTimeType);
  }

  params.append("page", options.page ?? 1);
  params.append("limit", options.limit ?? 9);

  const result = await apiClient(`/products?${params.toString()}`);

  return {
    ...result.data,
    products: (result.data?.products ?? [])
      .map(toProductListItem)
      .sort((first, second) => first.displayOrder - second.displayOrder),
  };
}

export async function getProductById(productId, signal) {
  const result = await apiClient(`/products/${productId}`, {
    signal,
  });

  return result.data;
}
