import { create } from "zustand";
import { getOrderStatus } from "../utils/orderStatus";

const useOrderStore = create((set, get) => ({
  ordersByUser: {},

  // 개발 환경에서만 테스트 주문 생성
  createTestOrder: (userId, requestId, cartItems, amounts, address) => {
    if (!import.meta.env.DEV) {
      throw new Error("실제 결제 API는 아직 연결 전입니다.");
    }

    if (!userId || !address || cartItems.length === 0) {
      throw new Error("로그인, 배송지, 주문 상품을 확인해주세요.");
    }

    const current = get().ordersByUser[userId] ?? [];

    // 같은 확인 버튼의 중복 실행 방지
    const existing = current.find((order) => order.orderId === requestId);
    if (existing) return existing;

    const items = cartItems.map((item) => ({
      orderItemId: crypto.randomUUID(),
      productId: item.productId ?? item.id,
      itemType: item.itemType ?? item.type,
      name: item.name,
      imageUrl: item.imageUrl ?? null,
      option: item.option ?? null,
      visitDate: item.visitDate ?? null,
      quantity: item.quantity,
      unitPrice: item.price,
      lineTotal: item.price * item.quantity,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const shippingFee = Math.max(0, Math.round(amounts.shippingFee));
    const discountAmount = Math.min(
      subtotal,
      Math.max(0, Math.round(amounts.discountAmount)),
    );

    const order = {
      orderId: requestId,
      orderNumber: `TEST-${requestId.slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "paid",
      items,
      subtotal,
      shippingFee,
      discountAmount,
      totalAmount: subtotal + shippingFee - discountAmount,
      shippingAddress: { ...address },
      tracking: null,
    };

    set({
      ordersByUser: {
        ...get().ordersByUser,
        [userId]: [order, ...current],
      },
    });

    return order;
  },

  // 결제 완료 상태에서만 테스트 취소 가능
  cancelOrder: (userId, orderId) => {
    const current = get().ordersByUser[userId] ?? [];
    const target = current.find((order) => order.orderId === orderId);

    // 날짜 기준으로 결제 완료인 주문만 취소 가능
    if (!target || getOrderStatus(target) !== "paid") {
      return false;
    }

    set({
      ordersByUser: {
        ...get().ordersByUser,
        [userId]: current.filter((order) => order.orderId !== orderId),
      },
    });

    return true;
  },

  // 배송 완료 화면 확인용: 굿즈가 포함된 주문만 가능
  completeTestDelivery: (userId, orderId) => {
    if (!import.meta.env.DEV) return;

    const current = get().ordersByUser[userId] ?? [];

    set({
      ordersByUser: {
        ...get().ordersByUser,
        [userId]: current.map((order) => {
          const hasGoods = order.items.some(
            (item) => item.itemType === "goods",
          );

          if (
            order.orderId !== orderId ||
            order.status !== "paid" ||
            !hasGoods
          ) {
            return order;
          }

          return {
            ...order,
            status: "delivered",
            tracking: {
              carrier: "테스트 택배",
              trackingNumber: "TEST-0000",
              deliveredAt: new Date().toISOString(),
            },
          };
        }),
      },
    });
  },
}));

export default useOrderStore;
