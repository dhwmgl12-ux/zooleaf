import { useLayoutEffect, useId, useRef } from "react";
import {
  CloseButton,
  ModalBody,
  ModalBox,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./Modal.styles";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  returnFocusRef,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useLayoutEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;

      // 모달을 연 버튼이 남아 있으면 그 버튼으로 복귀
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      } else {
        // 삭제로 원래 버튼이 사라졌다면 지정한 버튼으로 복귀
        returnFocusRef?.current?.focus();
      }
    };
  }, [isOpen, returnFocusRef]);

  if (!isOpen) return null;

  return (
    <ModalOverlay
      as="dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        // Escape로 닫을 때 React 상태도 함께 변경
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalBox>
        <ModalHeader>
          <ModalTitle id={titleId}>{title}</ModalTitle>

          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="닫기"
            autoFocus
          >
            ✕
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </ModalBox>
    </ModalOverlay>
  );
}
