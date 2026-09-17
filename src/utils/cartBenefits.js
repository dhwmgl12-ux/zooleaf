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
export function getBenefitDetails(items, benefitId, benefitDate = "") {
  const benefit = CART_BENEFITS.find((entry) => entry.id === benefitId);

  if (!benefit) {
    return { totalDiscount: 0, details: [] };
  }

  let remaining = benefit.maxQuantity;
  const details = [];

  // 시연 기준: 기존과 동일하게 대인 → 소인 → 기타 순서.
  // 실제 본인 확인이나 대상자 선택을 대신하는 규칙은 아닙니다.
  const priority = (item) => {
    const id = Number(item.productId ?? item.id);
    return id === 1 ? 0 : id === 3 ? 1 : 2;
  };

  const sortedItems = [...items].sort((a, b) => priority(a) - priority(b));

  for (const item of sortedItems) {
    const type = item.itemType ?? item.type;
    const productId = Number(item.productId ?? item.id);
    const quantity = Number(item.quantity);
    const unitPrice = Number(item.price);

    if (
      type !== "ticket" ||
      !benefit.productIds.includes(productId) ||
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(unitPrice) ||
      unitPrice < 0 ||
      remaining <= 0
    ) {
      continue;
    }

    const visitDate = item.visitDate || benefitDate;

    if (benefit.id === "cultureDay" && !isLastWednesday(visitDate)) {
      continue;
    }

    const appliedQuantity = Math.min(quantity, remaining);
    const discountAmount =
      Math.floor(unitPrice * benefit.rate) * appliedQuantity;

    remaining -= appliedQuantity;

    details.push({
      key: item.groupKey ?? item.cartItemId,
      name: item.name,
      option: item.option,
      visitDate,
      unitPrice,
      rate: benefit.rate,
      appliedQuantity,
      unappliedQuantity: quantity - appliedQuantity,
      discountAmount,
    });
  }

  return {
    totalDiscount: details.reduce((sum, item) => sum + item.discountAmount, 0),
    details,
  };
}

// 기존 함수를 사용하는 곳도 계속 동작하도록 유지
export function getBenefitDiscount(items, benefitId, benefitDate = "") {
  return getBenefitDetails(items, benefitId, benefitDate).totalDiscount;
}
