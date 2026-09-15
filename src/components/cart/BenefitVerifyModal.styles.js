import { theme } from "../../styles/variables";
import styled from "@emotion/styled";

export const Form = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  text-align: left;

  /* 공통 모달의 버튼 여백과 폼 간격이 중복되지 않도록 조정 */
  && [data-modal-actions] {
    margin-top: 4px;
  }
`;

export const BenefitHeading = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: ${theme.colors.background2};
  color: ${theme.colors.primary};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const BenefitDescription = styled.div`
  display: grid;
  gap: 6px;
  font-size: 14px;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: anywhere;

  small {
    color: ${theme.colors.textSecondary};
    font-size: 12px;
    line-height: 1.6;
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    font-weight: 600;
    line-height: 1.5;
  }

  input {
    width: 100%;
    min-width: 0;
    min-height: 44px;
    padding: 10px 12px;
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
    background: ${theme.colors.white};
    color: ${theme.colors.textPrimary};
    font: inherit;
    font-size: 16px;
    text-align: left;
  }

  input:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  input[aria-invalid="true"] {
    border-color: ${theme.colors.error};
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 13px;
`;

export const ApplyButton = styled.button`
  min-height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: 6px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const TicketList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 12px;
    border: 1px solid ${theme.colors.border};
    border-radius: 8px;
  }

  p {
    margin: 4px 0 0;
  }
`;

export const TicketStatus = styled.p`
  color: ${({ $eligible }) =>
    $eligible ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: 600;
`;

export const HighlightText = styled.strong`
  color: ${theme.colors.primary};
  font-weight: 700;
`;
