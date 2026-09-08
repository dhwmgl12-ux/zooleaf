import { useEffect } from "react"
import { CloseButton, ModalBody, ModalBox, ModalHeader, ModalOverlay, ModalTitle } from "./Modal..styles";

export default function Modal({isOpen, onClose, title, children}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton type="button" onClick={onClose} aria-label="닫기">
            ✕
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalBox>
    </ModalOverlay>
  );
}
