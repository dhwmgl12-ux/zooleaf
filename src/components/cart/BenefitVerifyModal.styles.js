import { theme } from "../../styles/variables";
import styled from "@emotion/styled";

export const Form = styled.form`
  display: grid;
  gap: 16px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;

  input {
    width: 100%;
    min-width: 0;
    min-height: 44px;
    padding: 10px 12px;
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
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
