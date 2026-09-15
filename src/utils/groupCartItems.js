// 옵션·이용일·체험 시간이 다르면 별도 상품으로 유지
export const getCartGroupKey = (item) =>
  JSON.stringify([
    item.itemType ?? item.type,
    String(item.productId ?? item.id),
    item.option ?? null,
    item.visitDate ?? null,
    item.time ?? null,
  ]);

export function groupCartItems(items) {
  const groups = new Map();

  for (const item of items) {
    const key = getCartGroupKey(item);
    const existing = groups.get(key);

    if (existing) {
      existing.quantity += item.quantity;
      existing.selected ||= item.selected ?? false;
      existing.sourceItems.push(item);
      continue;
    }

    groups.set(key, {
      ...item,
      groupKey: key,
      quantity: item.quantity,
      selected: item.selected ?? false,
      // 서버 수정·삭제에 사용할 원본 항목 보관
      sourceItems: [item],
    });
  }

  return [...groups.values()];
}
