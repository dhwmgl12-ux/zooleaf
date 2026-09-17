const storageKey = (userId, orderId) =>
  `zooleaf:order-display:v1:${encodeURIComponent(userId)}:${encodeURIComponent(orderId)}`;

export function saveOrderDisplayAmounts(userId, orderId, amounts) {
  if (!userId || !orderId) return false;

  const { subtotal, shippingFee, discountAmount } = amounts;

  if (
    ![subtotal, shippingFee, discountAmount].every(
      (value) => Number.isFinite(value) && value >= 0,
    )
  ) {
    return false;
  }

  const discount = Math.min(subtotal, discountAmount);

  try {
    localStorage.setItem(
      storageKey(userId, orderId),
      JSON.stringify({
        subtotal,
        shippingFee,
        discountAmount: discount,
        totalAmount: subtotal + shippingFee - discount,
      }),
    );

    return true;
  } catch {
    return false;
  }
}

export function getOrderDisplayAmounts(userId, order) {
  if (!order) return null;

  const original = {
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    discountAmount: order.discountAmount,
    totalAmount: order.totalAmount,
    isDemo: false,
  };

  if (!userId) return original;

  try {
    const saved = JSON.parse(
      localStorage.getItem(storageKey(userId, order.orderId)),
    );

    if (
      !saved ||
      ![
        saved.subtotal,
        saved.shippingFee,
        saved.discountAmount,
        saved.totalAmount,
      ].every((value) => Number.isFinite(value) && value >= 0) ||
      saved.discountAmount > saved.subtotal ||
      Math.abs(
        saved.totalAmount -
          (saved.subtotal + saved.shippingFee - saved.discountAmount),
      ) > 0.01
    ) {
      return original;
    }

    const isDifferent =
      saved.subtotal !== order.subtotal ||
      saved.shippingFee !== order.shippingFee ||
      saved.discountAmount !== order.discountAmount ||
      saved.totalAmount !== order.totalAmount;

    // 서버 금액에서 다시 할인하지 않고, 구매 당시 계산값을 표시합니다.
    return isDifferent ? { ...saved, isDemo: true } : original;
  } catch {
    return original;
  }
}
