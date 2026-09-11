const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export const statusLabels = {
  paid: "결제 완료",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "주문 취소",
};

// 한국 시간 기준으로 날짜를 숫자로 변환
function getKoreanDay(value) {
  const timestamp = new Date(value).getTime();

  return Math.floor((timestamp + KST_OFFSET_MS) / DAY_MS);
}

// 발표용: 주문 날짜를 기준으로 배송 상태 계산
export function getOrderStatus(order, now = Date.now()) {
  if (!order) return null;

  // 취소 또는 이미 변경된 상태는 유지
  if (order.status !== "paid") {
    return order.status;
  }

  const hasGoods = order.items.some((item) => item.itemType === "goods");

  // 입장권·체험권만 있는 주문에는 배송 상태 적용 안 함
  if (!hasGoods) return order.status;

  const elapsedDays = getKoreanDay(now) - getKoreanDay(order.createdAt);

  if (!Number.isFinite(elapsedDays)) return order.status;
  if (elapsedDays >= 2) return "delivered";
  if (elapsedDays >= 1) return "shipping";

  return "paid";
}
