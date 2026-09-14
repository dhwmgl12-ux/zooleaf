import Modal from "../common/Modal";
import {
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalDeleteButton,
} from "../../pages/CartPage.styles";

export default function CartDeleteModal({
  mode,
  onClose,
  onConfirm,
  disabled,
  error,
}) {
  const handleClose = () => {
    if (disabled) return;
    onClose();
  };

  return (
    <Modal
      variant="cart"
      isOpen
      onClose={handleClose}
      title={mode === "selected" ? "선택 상품 삭제" : "상품 삭제"}
    >
      <ModalText>
        {mode === "selected"
          ? "선택한 상품을 정말로 삭제하시겠습니까?"
          : "정말로 삭제하시겠습니까?"}
      </ModalText>

      {error && <ModalText role="alert">{error}</ModalText>}

      <ModalButtonArea data-modal-actions>
        <ModalCancelButton
          data-modal-cancel
          type="button"
          disabled={disabled}
          onClick={handleClose}
        >
          취소
        </ModalCancelButton>

        <ModalDeleteButton
          data-modal-confirm
          type="button"
          disabled={disabled}
          onClick={onConfirm}
        >
          {disabled ? "삭제 중..." : "삭제"}
        </ModalDeleteButton>
      </ModalButtonArea>
    </Modal>
  );
}
