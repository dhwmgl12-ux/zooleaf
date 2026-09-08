import {
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalDeleteButton,
} from "../../pages/CartPage.styles";

export default function CartDeleteModal({ mode, onClose, onConfirm }) {
  return (
    <ModalOverlay>
      <ModalBox>
        <ModalTitle>
          {mode === "selected" ? "선택 상품 삭제" : "상품 삭제"}
        </ModalTitle>

        <ModalText>
          {mode === "selected"
            ? "선택한 상품을 정말로 삭제하시겠습니까?"
            : "정말로 삭제하시겠습니까?"}
        </ModalText>

        <ModalButtonArea>
          <ModalCancelButton type="button" onClick={onClose}>
            취소
          </ModalCancelButton>

          <ModalDeleteButton type="button" onClick={onConfirm}>
            삭제
          </ModalDeleteButton>
        </ModalButtonArea>
      </ModalBox>
    </ModalOverlay>
  );
}
