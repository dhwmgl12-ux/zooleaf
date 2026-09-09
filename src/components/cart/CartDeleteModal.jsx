import {
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalDeleteButton,
} from "../../pages/CartPage.styles";

// 장바구니 상품 삭제 확인 모달
export default function CartDeleteModal({
  mode,
  onClose,
  onConfirm,
  disabled,
  error,
}) {
  return (
    <ModalOverlay>
      <ModalBox>
        {/* 삭제 방식에 따라 제목 변경*/}
        <ModalTitle>
          {mode === "selected" ? "선택 상품 삭제" : "상품 삭제"}
        </ModalTitle>

        {/* 삭제 방식에 따라 안내 문구 변경 */}
        <ModalText>
          {mode === "selected"
            ? "선택한 상품을 정말로 삭제하시겠습니까?"
            : "정말로 삭제하시겠습니까?"}
        </ModalText>
        {/* 삭제 요청 중 에러가 발생하면 표시 */}
        {error && <ModalText role="alert">{error}</ModalText>}

        {/*취소 / 삭제 버튼 영역 */}
        <ModalButtonArea>
          <ModalCancelButton
            type="button"
            disabled={disabled}
            onClick={onClose}
          >
            취소
          </ModalCancelButton>

          <ModalDeleteButton
            type="button"
            disabled={disabled}
            onClick={onConfirm}
          >
            삭제
          </ModalDeleteButton>
        </ModalButtonArea>
      </ModalBox>
    </ModalOverlay>
  );
}
