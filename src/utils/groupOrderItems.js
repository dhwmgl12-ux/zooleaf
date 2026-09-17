// 화면 표시용으로만 합산하며 서버 주문 데이터는 변경하지 않음
export function groupOrderItems(items = []) {
  const groups = new Map();

  for (const item of items) {
    const key = JSON.stringify([
      item.itemType,
      item.productId ?? item.orderItemId,
      item.name,
      item.option ?? null,
      item.visitDate ?? null,
      item.time ?? null,
      item.unitPrice,
    ]);

    const existing = groups.get(key);

    if (existing) {
      existing.quantity += item.quantity;
      existing.lineTotal += item.lineTotal;
    } else {
      groups.set(key, {
        ...item,
        groupKey: key,
      });
    }
  }

  return [...groups.values()];
}
