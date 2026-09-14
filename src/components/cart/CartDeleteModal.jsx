<<<<<<< HEAD
import Modal from "../common/Modal";
=======
﻿import Modal from "../common/Modal";
>>>>>>> 1720224 (feat:장바구니 공통모달)
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
<<<<<<< HEAD
      variant="cart"
=======
>>>>>>> 1720224 (feat:장바구니 공통모달)
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

<<<<<<< HEAD
      <ModalButtonArea data-modal-actions>
        <ModalCancelButton
          data-modal-cancel
=======
      <ModalButtonArea>
        <ModalCancelButton
>>>>>>> 1720224 (feat:장바구니 공통모달)
          type="button"
          disabled={disabled}
          onClick={handleClose}
        >
          취소
        </ModalCancelButton>

        <ModalDeleteButton
<<<<<<< HEAD
          data-modal-confirm
=======
>>>>>>> 1720224 (feat:장바구니 공통모달)
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
