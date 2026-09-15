import { useRef, useState } from "react";
import Modal from "../common/Modal";
import useAddressStore from "../../store/addressStore";
import useAuthStore from "../../store/authStore";
import useToastStore from "../../store/toastStore";
import {
  Card,
  CardHeader,
  HeadingGroup,
  CardTitle,
  ItemTitle,
  IconCircle,
  OutlineButton,
  AddressList,
  AddressBox,
  DefaultBadge,
  AddressTop,
  ButtonGroup,
  AddressDetails,
  AddressEmpty,
  DefaultAddressLabel,
  ProfileEditForm,
  ProfileField,
  ProfileLabel,
  ProfileInput,
  ProfileModalActions,
  ProfileCancelButton,
  ProfileSaveButton,
} from "../../pages/Mypage.styles";

import {
  formatAddressPhone,
  validateAddress,
} from "../../utils/addressValidation";

const emptyAddresses = [];

const initialForm = {
  label: "",
  recipientName: "",
  phone: "",
  address: "",
  isDefault: false,
};

const fields = [
  {
    name: "label",
    label: "배송지명",
    placeholder: "집, 회사 등",
    autoComplete: "off",
    maxLength: 30,
  },
  {
    name: "recipientName",
    label: "받는 분",
    placeholder: "이름",
    autoComplete: "name",
    maxLength: 50,
  },
  {
    name: "phone",
    label: "연락처",
    placeholder: "010-0000-0000",
    autoComplete: "tel",
    type: "tel",
    pattern: "01[016789]-[0-9]{3,4}-[0-9]{4}",
    maxLength: 13,
  },
  {
    name: "address",
    label: "주소",
    placeholder: "기본주소와 상세주소를 입력해주세요",
    autoComplete: "street-address",
    maxLength: 200,
  },
];

export default function AddressSection() {
  const userId = useAuthStore((state) => state.user?.id);
  const showToast = useToastStore((state) => state.showToast);
  const [errors, setErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const addAddressButtonRef = useRef(null);

  const addresses = useAddressStore(
    (state) => state.addressesByUser[userId] ?? emptyAddresses,
  );
  const saveAddress = useAddressStore((state) => state.saveAddress);
  const setDefaultAddress = useAddressStore((state) => state.setDefaultAddress);
  const removeAddress = useAddressStore((state) => state.removeAddress);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const isEditing = editingId !== null;
  const isEditingDefault = addresses.some(
    (item) => item.addressId === editingId && item.isDefault,
  );

  // 새 배송지는 빈 입력창으로 시작
  const openAddModal = () => {
    if (!userId) {
      showToast("로그인 후 이용해주세요.");
      return;
    }

    setEditingId(null);
    setForm({
      ...initialForm,
      isDefault: addresses.length === 0,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // 수정할 배송지 정보를 입력창에 표시
  const openEditModal = (address) => {
    setEditingId(address.addressId);
    setForm({ ...address });
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const nextValue =
      type === "checkbox"
        ? checked
        : name === "phone"
          ? formatAddressPhone(value)
          : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!userId) {
      showToast("로그인 후 이용해주세요.");
      return;
    }

    const result = validateAddress(form);

    setForm(result.values);
    setErrors(result.errors);

    const firstError = Object.keys(result.errors)[0];

    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }

    saveAddress(userId, result.values, editingId);
    closeModal();

    showToast(isEditing ? "배송지를 수정했습니다." : "배송지를 추가했습니다.");
  };

  // 삭제 버튼 클릭: 확인 모달만 열기
  const handleDelete = (address) => {
    setDeleteTarget(address);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  // 확인 모달에서 삭제를 눌렀을 때 실제 삭제
  const confirmDelete = () => {
    if (!userId) {
      showToast("로그인 후 이용해주세요.");
      closeDeleteModal();
      return;
    }

    if (!deleteTarget) return;

    removeAddress(userId, deleteTarget.addressId);
    closeDeleteModal();

    showToast("배송지를 삭제했습니다.");
  };

  return (
    <Card>
      <CardHeader>
        <HeadingGroup>
          <IconCircle aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </IconCircle>

          <div>
            <CardTitle>배송지 관리</CardTitle>
            <p>배송지를 등록하고 관리할 수 있습니다.</p>
          </div>
        </HeadingGroup>

        <OutlineButton
          ref={addAddressButtonRef}
          type="button"
          onClick={openAddModal}
        >
          + 새 배송지 추가
        </OutlineButton>
      </CardHeader>

      {addresses.length === 0 ? (
        <AddressEmpty>
          <p>현재 등록된 배송지가 없습니다.</p>
          <p>배송지를 등록해주세요.</p>
        </AddressEmpty>
      ) : (
        <AddressList>
          {addresses.map((address) => (
            <AddressBox key={address.addressId}>
              {address.isDefault && <DefaultBadge>기본배송지</DefaultBadge>}

              <AddressTop>
                <ItemTitle>{address.label}</ItemTitle>

                <ButtonGroup>
                  <OutlineButton
                    type="button"
                    aria-label={`${address.label} 배송지 수정`}
                    onClick={() => openEditModal(address)}
                  >
                    수정
                  </OutlineButton>

                  <OutlineButton
                    type="button"
                    aria-label={`${address.label} 배송지 삭제`}
                    onClick={() => handleDelete(address)}
                  >
                    삭제
                  </OutlineButton>

                  {!address.isDefault && (
                    <OutlineButton
                      type="button"
                      aria-label={`${address.label} 기본 배송지로 설정`}
                      onClick={() =>
                        setDefaultAddress(userId, address.addressId)
                      }
                    >
                      기본으로 설정
                    </OutlineButton>
                  )}
                </ButtonGroup>
              </AddressTop>

              <AddressDetails>
                <div>
                  <dt>수령인</dt>
                  <dd>{address.recipientName}</dd>
                </div>
                <div>
                  <dt>연락처</dt>
                  <dd>{address.phone}</dd>
                </div>
                <div>
                  <dt>주소</dt>
                  <dd>{address.address}</dd>
                </div>
              </AddressDetails>
            </AddressBox>
          ))}
        </AddressList>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "배송지 수정" : "배송지 추가"}
      >
        <ProfileEditForm onSubmit={handleSave} noValidate>
          {fields.map((field) => (
            <ProfileField key={field.name}>
              <ProfileLabel htmlFor={`address-${field.name}`}>
                {field.label}
              </ProfileLabel>
              <ProfileInput
                id={`address-${field.name}`}
                name={field.name}
                type={field.type ?? "text"}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                maxLength={field.maxLength}
                inputMode={field.name === "phone" ? "tel" : undefined}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name] ? `address-${field.name}-error` : undefined
                }
                required
              />
              {errors[field.name] && (
                <p
                  id={`address-${field.name}-error`}
                  role="alert"
                  style={{ color: "#b42318", fontSize: "13px" }}
                >
                  {errors[field.name]}
                </p>
              )}
            </ProfileField>
          ))}

          <DefaultAddressLabel>
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
              disabled={addresses.length === 0 || isEditingDefault}
            />
            기본 배송지로 설정
          </DefaultAddressLabel>

          <ProfileModalActions>
            <ProfileCancelButton type="button" onClick={closeModal}>
              취소
            </ProfileCancelButton>

            <ProfileSaveButton type="submit">저장하기</ProfileSaveButton>
          </ProfileModalActions>
        </ProfileEditForm>
      </Modal>
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={closeDeleteModal}
        title="배송지 삭제"
        returnFocusRef={addAddressButtonRef}
      >
        <p>
          <strong>{deleteTarget?.label}</strong>
          {" 배송지를 삭제하시겠습니까?"}
        </p>

        {deleteTarget?.isDefault && (
          <p>
            기본 배송지입니다. 다른 배송지가 남아 있다면 첫 번째 배송지가 기본
            배송지로 지정됩니다.
          </p>
        )}

        <ProfileModalActions>
          <ProfileCancelButton type="button" onClick={closeDeleteModal}>
            취소
          </ProfileCancelButton>

          <ProfileSaveButton type="button" onClick={confirmDelete}>
            삭제
          </ProfileSaveButton>
        </ProfileModalActions>
      </Modal>
    </Card>
  );
}
