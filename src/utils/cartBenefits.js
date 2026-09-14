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

// 할인 총액과 상품별 적용 내역 계산
export function getBenefitDetails(items, benefitId) {
  const benefit = CART_BENEFITS.find((entry) => entry.id === benefitId);

  if (!benefit) {
    return { totalDiscount: 0, details: [] };
  }

  let remaining = benefit.maxQuantity;
  const details = [];

  // 대인 종일권 → 소인 종일권 순서로 적용
  const getPriority = (item) => {
    const productId = Number(item.productId ?? item.id);

    if (productId === 1) return 0;
    if (productId === 3) return 1;
    return 2;
  };

  const sortedItems = [...items].sort(
    (a, b) => getPriority(a) - getPriority(b),
  );

  for (const item of sortedItems) {
    const type = item.itemType ?? item.type;
    const productId = Number(item.productId ?? item.id);

    if (
      type !== "ticket" ||
      !benefit.productIds.includes(productId) ||
      remaining <= 0
    ) {
      continue;
    }

    if (benefit.id === "cultureDay" && !isLastWednesday(item.visitDate)) {
      continue;
    }

    const appliedQuantity = Math.min(item.quantity, remaining);
    const unitDiscount = Math.floor(item.price * benefit.rate);

    remaining -= appliedQuantity;

    details.push({
      key: item.groupKey ?? item.cartItemId,
      name: item.name,
      option: item.option,
      visitDate: item.visitDate,
      unitPrice: item.price,
      rate: benefit.rate,
      appliedQuantity,
      unappliedQuantity: item.quantity - appliedQuantity,
      discountAmount: unitDiscount * appliedQuantity,
    });
  }

  return {
    totalDiscount: details.reduce(
      (sum, detail) => sum + detail.discountAmount,
      0,
    ),
    details,
  };
}

// 기존 함수를 사용하는 곳도 계속 동작하도록 유지
export function getBenefitDiscount(items, benefitId) {
  return getBenefitDetails(items, benefitId).totalDiscount;
}
