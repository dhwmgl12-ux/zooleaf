import { create } from "zustand";

const useAddressStore = create((set) => ({
  // 로그인한 회원 ID별로 배송지 구분
  addressesByUser: {},

  // 배송지 추가 또는 수정
  saveAddress: (userId, form, addressId = null) => {
    set((state) => {
      const current = state.addressesByUser[userId] ?? [];
      const isEditing = addressId !== null;

      const savedAddress = {
        ...form,
        addressId: isEditing ? addressId : crypto.randomUUID(),
        isDefault: current.length === 0 || form.isDefault,
      };

      let next = isEditing
        ? current.map((item) =>
            item.addressId === addressId ? savedAddress : item,
          )
        : [...current, savedAddress];

      // 기본 배송지는 하나만 유지
      if (savedAddress.isDefault) {
        next = next.map((item) => ({
          ...item,
          isDefault: item.addressId === savedAddress.addressId,
        }));
      }

      // 기본 배송지가 없으면 첫 번째 배송지를 기본으로 지정
      if (next.length > 0 && !next.some((item) => item.isDefault)) {
        next = next.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        }));
      }

      return {
        addressesByUser: {
          ...state.addressesByUser,
          [userId]: next,
        },
      };
    });
  },

  // 기본 배송지 전환
  setDefaultAddress: (userId, addressId) => {
    set((state) => {
      const current = state.addressesByUser[userId] ?? [];

      if (!current.some((item) => item.addressId === addressId)) {
        return state;
      }

      return {
        addressesByUser: {
          ...state.addressesByUser,
          [userId]: current.map((item) => ({
            ...item,
            isDefault: item.addressId === addressId,
          })),
        },
      };
    });
  },

  // 배송지 삭제
  removeAddress: (userId, addressId) => {
    set((state) => {
      let next = (state.addressesByUser[userId] ?? []).filter(
        (item) => item.addressId !== addressId,
      );

      // 기본 배송지를 삭제하면 남은 첫 배송지를 기본 지정
      if (next.length > 0 && !next.some((item) => item.isDefault)) {
        next = next.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        }));
      }

      return {
        addressesByUser: {
          ...state.addressesByUser,
          [userId]: next,
        },
      };
    });
  },
}));

export default useAddressStore;
