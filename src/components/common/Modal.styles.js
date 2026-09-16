import styled from "@emotion/styled";
import { theme } from "../../styles/variables";
import { css } from "@emotion/react";

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

  ${({ $variant }) =>
    $variant === "cart" &&
    css`
      width: 100%;
      max-width: 380px;
      max-height: 85dvh;
      border-radius: 18px;
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
    `}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[24]};

  ${({ $variant }) =>
    $variant === "mypage" &&
    css`
      padding: 32px 32px 24px;
      gap: 16px;
      align-items: flex-start;

      h3 {
        margin: 0;
        min-width: 0;
        text-align: left;
      }
    `}
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

  ${({ $variant }) =>
    ($variant === "mypage" || $variant === "cart") &&
    css`
      margin: 0;
      padding: 8px 32px 32px;
      min-height: 0;
      flex: 0 1 auto;
      white-space: normal;
      text-align: left;

      p {
        margin: 0;
      }

      p + p {
        margin-top: 8px;
      }

      /* 모든 장바구니 모달의 하단 버튼 영역 */
      [data-modal-actions] {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 14px;
        width: 100%;
        margin-top: 24px;
      }

      [data-modal-actions] > button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 0;
        height: auto;
        min-height: 40px;
        padding: 8px 12px;
        border: 0;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.4;
        cursor: pointer;
      }

      /* 취소 버튼 */
      [data-modal-actions] > [data-modal-cancel] {
        background: #c6c9c7;
        color: ${theme.colors.textPrimary};
      }

      /* 확인·삭제·적용 버튼 */
      [data-modal-actions] > [data-modal-confirm] {
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
      }

      [data-modal-actions] > button:hover:not(:disabled) {
        filter: brightness(0.95);
      }

      [data-modal-actions] > button:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 3px;
      }

      [data-modal-actions] > button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      /* 혜택 입력창도 같은 디자인으로 적용 */
      input {
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        min-height: 44px;
        border-radius: 8px;
      }
    `}
`;
