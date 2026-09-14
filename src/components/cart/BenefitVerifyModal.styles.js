import { theme } from "../../styles/variables";
import styled from "@emotion/styled";

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Field = styled.div`
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

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 13px;
`;

const ApplyButton = styled.button`
  min-height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: 6px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  cursor: pointer;
`;

export { Form, Field, ErrorMessage, ApplyButton };
