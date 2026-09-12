import {
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalAddButton,
} from "../../pages/CartPage.styles";

export default function CartAddModal({
  onClose,
  onGoToCart,
}) {
  return (
    <ModalOverlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalBox
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-add-modal-title"
      >
        <ModalTitle id="cart-add-modal-title">
          장바구니에 담았습니다.
        </ModalTitle>

        <ModalText>
          장바구니로 이동하시겠습니까?
        </ModalText>

        <ModalButtonArea>
          <ModalCancelButton
            type="button"
            onClick={onClose}
          >
            쇼핑 계속하기
          </ModalCancelButton>

          <ModalAddButton
            type="button"
            onClick={onGoToCart}
          >
            장바구니 보기
          </ModalAddButton>
        </ModalButtonArea>
      </ModalBox>
    </ModalOverlay>
  );
}