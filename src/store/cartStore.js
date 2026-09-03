import { create } from "zustand";

// Zustand 장바구니 전역 상태 생성
const useCartStore = create((set) => ({
  // 장바구니 상품 목록,
  cartItems: [
    {
      id: 1,
      type: "ticket",
      name: "일반입장권",
      imageUrl: "https://placehold.co/120x120",
      visitDate: "2026-09-10",
      price: 32000,
      quantity: 2,
      discountRate: 0,
    },

    {
      id: 2,
      type: "experience",
      name: "기린 먹이주기 체험",
      imageUrl: "https://placehold.co/120x120",
      visitDate: "2026-09-10",
      time: "14:00",
      price: 10000,
      quantity: 2,
      discountRate: 0,
    },

    {
      id: 3,
      type: "goods",
      name: "ZooLeaf 에코백",
      imageUrl: "https://placehold.co/120x120",
      option: "기본",
      price: 25000,
      quantity: 1,
      discountRate: 0.1,
    },

    {
      id: 4,
      type: "goods",
      name: "사파리 캡",
      imageUrl: "https://placehold.co/120x120",
      option: "FG",
      price: 19000,
      quantity: 1,
      discountRate: 0,
    },
  ],

  // 장바구니에 상품 추가
  addToCart: (item) =>
    set((state) => {
      // 같은 상품이 이미 장바구니에 있는지 찾기
      //id, type, option, 이용일, 시간이 모두 같아야 같은 상품으로 판단
      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.type === item.type &&
          cartItem.option === item.option &&
          cartItem.visitDate === item.visitDate &&
          cartItem.time === item.time,
      );

      // 같은 상품이 이미 있다면
      if (existingItem) {
        return {
          // 기존 장바구니 배열을 새 배열로 변경
          cartItems: state.cartItems.map(
            (cartItem) =>
              // 현재 상품이 기존 상품과 같다면 수량만 증가
              cartItem === existingItem
                ? {
                    // 기존 상품 정보 유지
                    ...cartItem,

                    // 기존 수량 + 새로 들어온 수량
                    // item.quantity가 없으면 1을 더함
                    quantity: cartItem.quantity + (item.quantity ?? 1),
                  }
                : cartItem, // 다른 상품은 그대로 유지
          ),
        };
      }

      // 같은 상품이 없다면 새로운 상품 추가
      return {
        cartItems: [
          // 기존 장바구니 상품 유지
          ...state.cartItems,
          {
            // 새 상품 정보 복사
            ...item,

            // quantity가 없으면 기본값 1
            quantity: item.quantity ?? 1,
          },
        ],
      };
    }),

  // 특정 상품의 수량을 1 증가
  increaseQuantity: (id, type) =>
    set((state) => ({
      cartItems: state.cartItems.map(
        (item) =>
          // id와 type이 같은 상품을 찾음
          item.id === id && item.type === type
            ? {
                // 기존 상품 정보 유지
                ...item,

                quantity: item.quantity + 1,
              }
            : item, // 다른 상품은 그대로 유지
      ),
    })),

  // 특정 상품의 수량을 1 감소
  decreaseQuantity: (id, type) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        // id와 type이 같은 상품을 찾음
        item.id === id && item.type === type
          ? {
              // 기존 상품 정보 유지
              ...item,

              // 수량을 1 감소
              // Math.max를 사용해서 최소 수량을 1로 제한
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    })),

  // 특정 상품을 장바구니에서 삭제
  removeFromCart: (id, type) =>
    set((state) => ({
      //삭제할 상품을 제외한 새로운 배열 생성
      cartItems: state.cartItems.filter(
        // id와 type이 둘 다 같은 상품만 제거
        (item) => !(item.id === id && item.type === type),
      ),
    })),

  // 장바구니 전체 비우기
  clearCart: () =>
    set({
      cartItems: [],
    }),
}));

// 다른 컴포넌트에서 사용할 수 있도록 export
export default useCartStore;
