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
  // 서버에서 장바구니 목록을 가져와 프론트에서 사용하는 id, type 값을 추가
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

  // 추가/수정/삭제 요청 후 장바구니 목록을 다시 조회해서 상태 갱신
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

  // 특정 장바구니 상품의 수량 변경
  const changeQuantity = (id, delta) => {
    const item = get().cartItems.find((entry) => entry.cartItemId === id);
    if (!item || item.quantity + delta < 1) return Promise.resolve(false);
    return mutate(() => updateCartQuantity(id, item.quantity + delta));
  };
  return {
    // 장바구니 상태
    cartItems: [],
    isLoading: false,
    isUpdating: false,
    error: "",

    // 장바구니 목록 조회
    fetchCart: async () => {
      if (get().isLoading || get().isUpdating) return;
      set({ isLoading: true, error: "" });

      // 로딩 화면 확인용
      await new Promise((resolve) => setTimeout(resolve, 2000));

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

    // 장바구니에 상품 추가
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

    // 수량 증가
    increaseQuantity: (id) => changeQuantity(id, 1),

    // 수량 감소
    decreaseQuantity: (id) => changeQuantity(id, -1),

    // 개별 상품 삭제
    removeFromCart: (id) => mutate(() => deleteCartItem(id)),

    // 선택한 상품 삭제
    removeSelected: (ids) =>
      ids.length
        ? mutate(() => deleteSelectedCartItems(ids))
        : Promise.resolve(false),

    // 장바구니 전체 삭제
    clearCart: () => mutate(deleteAllCartItems),
  };
});

export default useCartStore;
