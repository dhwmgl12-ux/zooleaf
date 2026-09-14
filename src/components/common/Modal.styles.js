import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;

  margin: 0;
  padding: 16px;
  border: 0;

  background: rgba(0, 0, 0, 0.5);

  &:not([open]) {
    display: none;
  }

  &[open] {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::backdrop {
    background: transparent;
  }
`;

export const ModalBox = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  overflow: hidden;
  width: 90%;
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
  margin: ${theme.spacing[24]} 0 ${theme.spacing[24]} 0;
  padding: ${theme.spacing[24]};
  overflow-y: auto;
  flex: 1;
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textPrimary};
  line-height: 1.6;
  white-space: pre-line;

  /* 스크롤바 커스텀 - FireFox */
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.textSecondary} transparent;

  /* 스크롤바 커스텀 chrome edge safari (webkit 계열) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.textSecondary};
    border-radius: ${theme.radius.button};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.colors.textPrimary};
  }
`;
