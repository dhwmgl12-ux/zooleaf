import { useState } from "react";
import useCartStore from "../store/cartStore";

const getItemKey = (item) =>
  JSON.stringify([item.type, item.id, item.option, item.visitDate, item.time]);

export default function useCart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const isSelected = (item) => selectedKeys.includes(getItemKey(item));
  const selectedItems = cartItems.filter(isSelected);
  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  const toggleItem = (item) => {
    const key = getItemKey(item);
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key],
    );
  };

  const toggleAll = () => setSelectedKeys(isAllSelected ? [] : cartItems.map(getItemKey));

  const openDeleteModal = (item) => {
    if (!item && selectedItems.length === 0) return;
    setDeleteModal({ mode: item ? "single" : "selected", item });
  };
  const closeDeleteModal = () => setDeleteModal(null);

  const confirmDelete = () => {
    if (!deleteModal) return;
    const items = deleteModal.mode === "single" ? [deleteModal.item] : selectedItems;
    items.forEach((item) => removeFromCart(item.id, item.type));
    // 스토어의 삭제 기준(id, type)에 맞춰 선택 상태도 정리합니다.
    const removedKeys = cartItems
      .filter((item) => items.some((target) => target.id === item.id && target.type === item.type))
      .map(getItemKey);
    setSelectedKeys((prev) => prev.filter((key) => !removedKeys.includes(key)));
    closeDeleteModal();
  };

  return {
    cartItems, selectedCount: selectedItems.length, isAllSelected,
    getItemKey, isSelected, toggleItem, toggleAll,
    increaseQuantity, decreaseQuantity,
    deleteModal, openDeleteModal, closeDeleteModal, confirmDelete,
  };
}
