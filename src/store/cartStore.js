import { create } from "zustand";
import {
  getCart,
  addCart,
  updateCartQuantity,
  deleteCartItem,
  deleteSelectedCartItems,
  deleteAllCartItems,
} from "../api/cartApi";

const useCartStore = create((set, get) => {
  const readItems = async () => {
    const response = await getCart();
    if (!Array.isArray(response.data?.items))
      throw new Error("장바구니 응답 형식을 확인해주세요.");
    return response.data.items.map((item) => ({
      ...item,
      id: item.productId,
      type: item.itemType,
    }));
  };
  const mutate = async (action) => {
    if (get().isUpdating || get().isLoading) return false;
    set({ isUpdating: true, error: "" });
    try {
      await action();
      set({ cartItems: await readItems() });
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    } finally {
      set({ isUpdating: false });
    }
  };
  const changeQuantity = (id, delta) => {
    const item = get().cartItems.find((entry) => entry.cartItemId === id);
    if (!item || item.quantity + delta < 1) return Promise.resolve(false);
    return mutate(() => updateCartQuantity(id, item.quantity + delta));
  };
  return {
    cartItems: [],
    isLoading: false,
    isUpdating: false,
    error: "",
    fetchCart: async () => {
      if (get().isLoading || get().isUpdating) return;
      set({ isLoading: true, error: "" });
      try {
        const items = await readItems();
        set({ cartItems: items });
        return items;
      } catch (error) {
        set({ cartItems: [], error: error.message });
      } finally {
        set({ isLoading: false });
      }
    },
    addToCart: (item) =>
      mutate(() =>
        addCart({
          itemType: item.itemType ?? item.type,
          productId: item.productId ?? item.id,
          quantity: item.quantity ?? 1,
          option: item.option ?? null,
          ...(item.visitDate && { visitDate: item.visitDate }),
        }),
      ),
    increaseQuantity: (id) => changeQuantity(id, 1),
    decreaseQuantity: (id) => changeQuantity(id, -1),
    removeFromCart: (id) => mutate(() => deleteCartItem(id)),
    removeSelected: (ids) =>
      ids.length
        ? mutate(() => deleteSelectedCartItems(ids))
        : Promise.resolve(false),
    clearCart: () => mutate(deleteAllCartItems),
  };
});

export default useCartStore;
