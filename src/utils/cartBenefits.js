export const CART_BENEFITS = [
  {
    id: "partner",
    label: "ZooLeaf 제휴카드 - 50%",
    rate: 0.5,
    productIds: [1, 3],
    maxQuantity: 2, // 본인 + 동반 1인
    inputLabel: "테스트 카드번호 뒤 4자리",
    digits: 4,
  },
  {
    id: "membership",
    label: "통신사 멤버십 - 40%",
    rate: 0.4,
    productIds: [1, 3],
    maxQuantity: 1, // 본인
    inputLabel: "테스트 멤버십 확인번호 4자리",
    digits: 4,
  },
  {
    id: "culture",
    label: "문화누리카드 - 30%",
    rate: 0.3,
    productIds: [1, 3, 5],
    maxQuantity: 1, // 본인
    inputLabel: "테스트 카드번호 뒤 4자리",
    digits: 4,
  },
  {
    id: "cultureDay",
    label: "문화가 있는 날 - 30%",
    rate: 0.3,
    productIds: [1, 3],
    maxQuantity: Infinity,
  },
];

export function isLastWednesday(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  const nextWeek = new Date(year, month - 1, day + 7);

  return date.getDay() === 3 && nextWeek.getMonth() !== month - 1;
}

export function getBenefitDiscount(items, benefitId) {
  const benefit = CART_BENEFITS.find((entry) => entry.id === benefitId);
  if (!benefit) return 0;

  let remaining = benefit.maxQuantity;

  // 상품 ID: 대인 종일권 1 → 소인 종일권 3 → 나머지
  const getPriority = (item) => {
    const productId = Number(item.productId ?? item.id);

    if (productId === 1) return 0;
    if (productId === 3) return 1;
    return 2;
  };

  // 복사본만 정렬해서 화면의 상품 순서는 유지
  const sortedItems = [...items].sort(
    (a, b) => getPriority(a) - getPriority(b),
  );

  return sortedItems.reduce((sum, item) => {
    const type = item.itemType ?? item.type;
    const productId = Number(item.productId ?? item.id);

    if (
      type !== "ticket" ||
      !benefit.productIds.includes(productId) ||
      remaining <= 0
    ) {
      return sum;
    }

    // 문화가 있는 날은 상품의 이용일을 기준으로 확인
    if (benefit.id === "cultureDay" && !isLastWednesday(item.visitDate)) {
      return sum;
    }

    const quantity = Math.min(item.quantity, remaining);
    remaining -= quantity;

    return sum + Math.floor(item.price * benefit.rate) * quantity;
  }, 0);
}
