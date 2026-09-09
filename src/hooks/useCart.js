import { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";

// 장바구니 상품의 고유 식별값 반환
const getItemKey = (item) => item.cartItemId;

export default function useCart() {
  const cart = useCartStore();

  // 상품별 선택 여부 저장
  const [selection, setSelection] = useState({});

  // 삭제 모달 상태 저장
  const [deleteModal, setDeleteModal] = useState(null);

  // 페이지 진입 시 장바구니 목록 조회
  useEffect(() => {
    cart.fetchCart();
  }, [cart.fetchCart]);

  // 특정 상품의 선택 여부 확인
  const isSelected = (item) =>
    selection[getItemKey(item)] ?? item.selected ?? false;

  // 선택된 상품만 추출
  const selectedItems = cart.cartItems.filter(isSelected);

  // 전체 상품 선택 여부 확인
  const isAllSelected =
    cart.cartItems.length > 0 && selectedItems.length === cart.cartItems.length;

  // 개별 상품 선택/해제
  const toggleItem = (item) => {
    setSelection((prev) => ({
      ...prev,
      [getItemKey(item)]: !isSelected(item),
    }));
  };

  // 전체 상품 선택/해제
  const toggleAll = () =>
    setSelection(
      Object.fromEntries(
        cart.cartItems.map((item) => [getItemKey(item), !isAllSelected]),
      ),
    );

  // 개별 또는 선택 상품 삭제 모달 열기
  const openDeleteModal = (item) => {
    if (cart.isUpdating || (!item && selectedItems.length === 0)) return;
    setDeleteModal({ mode: item ? "single" : "selected", item });
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    if (!cart.isUpdating) setDeleteModal(null);
  };

  // 삭제 확정 후 서버와 선택 상태 갱신
  const confirmDelete = async () => {
    if (!deleteModal || cart.isUpdating) return;

    const ids = (
      deleteModal.mode === "single" ? [deleteModal.item] : selectedItems
    ).map(getItemKey);
    const success =
      deleteModal.mode === "single"
        ? await cart.removeFromCart(ids[0])
        : await cart.removeSelected(ids);
    if (success) {
      setSelection((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(
            ([key]) => !ids.some((id) => String(id) === key),
          ),
        ),
      );
      setDeleteModal(null);
    }
  };

  // CartPage에서 사용할 상태와 함수 반환
  return {
    ...cart,
    selectedCount: selectedItems.length,
    isAllSelected,
    getItemKey,
    isSelected,
    toggleItem,
    toggleAll,
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
