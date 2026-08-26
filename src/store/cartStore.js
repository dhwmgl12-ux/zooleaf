import { create } from "zustand";

const useCartSotre = create((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.type === item.type &&
          cartItem.option === item.option &&
          cartItem.visitDate === item.visitDate &&
          cartItem.time === item.time,
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem === existingItem
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + (item.quantity ?? 1),
                }
              : cartItem,
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            ...item,
            quantity: item.quantity ?? 1,
          },
        ],
      };
    }),

  increaseQuantity: (id, type) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id && item.type === type
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    })),

  decreaseQuantity: (id, type) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id && item.type === type
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    })),

  removeFromCart: (id, type) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !(item.id === id && item.type === type),
      ),
    })),

  clearCart: () =>
    set({
      cartItems: [],
    }),
}));

export default useCartStore;
