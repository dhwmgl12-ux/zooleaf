import { create } from "zustand";
import useAuthStore from "./authStore";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../api/addressApi";

function requireUser(userId) {
  const auth = useAuthStore.getState();

  if (!userId || !auth.token || auth.user?.id !== userId) {
    throw new Error("로그인 후 이용해주세요.");
  }

  return auth.token;
}

function toPayload(form) {
  return {
    label: form.label,
    recipientName: form.recipientName,
    phone: form.phone,
    address: form.address,
    isDefault: Boolean(form.isDefault),
  };
}

const useAddressStore = create((set) => ({
  addressesByUser: {},

  // 서버의 최신 배송지 목록 저장
  fetchAddresses: async (userId) => {
    const token = requireUser(userId);
    const result = await getAddresses();
    const addresses = result.data?.addresses;

    if (!Array.isArray(addresses)) {
      throw new Error("배송지 목록 응답 형식을 확인해 주세요.");
    }

    // 요청 도중 로그아웃하거나 계정이 바뀌면 반영하지 않음
    const auth = useAuthStore.getState();

    if (auth.token !== token || auth.user?.id !== userId) return;

    set((state) => ({
      addressesByUser: {
        ...state.addressesByUser,
        [userId]: addresses,
      },
    }));

    return addresses;
  },

  // 추가 또는 수정
  saveAddress: async (userId, form, addressId = null) => {
    requireUser(userId);

    const payload = toPayload(form);

    if (addressId !== null) {
      return updateAddress(addressId, payload);
    }

    return createAddress(payload);
  },

  // 기본 배송지 변경
  setDefaultAddress: async (userId, addressId) => {
    requireUser(userId);

    return updateAddress(addressId, {
      isDefault: true,
    });
  },

  // 삭제
  removeAddress: async (userId, addressId) => {
    requireUser(userId);

    return deleteAddress(addressId);
  },
}));

export default useAddressStore;
