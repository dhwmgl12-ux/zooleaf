import { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";

const getItemKey = (item) => item.cartItemId;

export default function useCart() {
  const cart = useCartStore();
  const [selection, setSelection] = useState({});
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    cart.fetchCart();
  }, [cart.fetchCart]);

  const isSelected = (item) => selection[getItemKey(item)] ?? item.selected ?? false;
  const selectedItems = cart.cartItems.filter(isSelected);
  const isAllSelected = cart.cartItems.length > 0 && selectedItems.length === cart.cartItems.length;
  const toggleItem = (item) => {
    setSelection((prev) => ({ ...prev, [getItemKey(item)]: !isSelected(item) }));
  };
  const toggleAll = () => setSelection(Object.fromEntries(
    cart.cartItems.map((item) => [getItemKey(item), !isAllSelected]),
  ));
  const openDeleteModal = (item) => {
    if (cart.isUpdating || (!item && selectedItems.length === 0)) return;
    setDeleteModal({ mode: item ? "single" : "selected", item });
  };
  const closeDeleteModal = () => {
    if (!cart.isUpdating) setDeleteModal(null);
  };
  const confirmDelete = async () => {
    if (!deleteModal || cart.isUpdating) return;
    const ids = (deleteModal.mode === "single" ? [deleteModal.item] : selectedItems).map(getItemKey);
    const success = deleteModal.mode === "single"
      ? await cart.removeFromCart(ids[0])
      : await cart.removeSelected(ids);
    if (success) {
      setSelection((prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => !ids.some((id) => String(id) === key))));
      setDeleteModal(null);
    }
  };
  return {
    ...cart, selectedCount: selectedItems.length, isAllSelected,
    getItemKey, isSelected, toggleItem, toggleAll,
    deleteModal, openDeleteModal, closeDeleteModal, confirmDelete,
  };
}
