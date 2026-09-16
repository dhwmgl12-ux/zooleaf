import { create } from "zustand";
import { getOrders, cancelOrderRequest } from "../api/orderApi";
import useAuthStore from "./authStore";

const useOrderStore = create((set, get) => ({
  ordersByUser: {},

  // 서버 주문 목록 조회
  fetchOrders: async (userId) => {
    const auth = useAuthStore.getState();

    if (!userId || !auth.token || auth.user?.id !== userId) {
      throw new Error("로그인 후 이용해주세요.");
    }

    const token = auth.token;
    const result = await getOrders();
    const orders = result.data?.orders;

    if (!Array.isArray(orders)) {
      throw new Error("주문 목록 응답 형식을 확인해 주세요.");
    }

    // 요청 도중 로그인 계정이 바뀌면 반영하지 않음
    const currentAuth = useAuthStore.getState();

    if (currentAuth.token !== token || currentAuth.user?.id !== userId) {
      return;
    }

    set((state) => ({
      ordersByUser: {
        ...state.ordersByUser,
        [userId]: orders,
      },
    }));

    return orders;
  },

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

  // 서버에 주문 취소 요청
  cancelOrder: async (userId, orderId) => {
    const auth = useAuthStore.getState();

    if (!userId || !auth.token || auth.user?.id !== userId) {
      throw new Error("로그인 후 이용해주세요.");
    }

    // 실제 취소 가능 여부는 서버가 최종 판단
    return cancelOrderRequest(orderId);
  },
}));

export default useOrderStore;
