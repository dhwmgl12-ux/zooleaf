import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalBox = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  width: 90;
  max-width: 500px;
  max-height: 70%;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[24]};
  border-bottom: ${theme.colors.textPrimary};
`;

export const ModalTitle = styled.h3`
  font-size: ${theme.fontSize.h5.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textPrimary};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.h5.size};
  color: ${theme.colors.textSecondary};

  &:hover {
    color: ${theme.colors.textPrimary};
  }
`;

export const ModalBody = styled.div`
  padding: ${theme.spacing[24]};
  overflow-y: auto;
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textPrimary};
  line-height: 1.6;
  white-space: pre-line;
`;
