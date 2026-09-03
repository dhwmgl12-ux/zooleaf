import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${theme.spacing[48]};
`;

export const Title = styled.h2 `
  font-size: ${theme.fontSize.h3.size};
  line-height: ${theme.fontSize.h3.lineheight};
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing[32]};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[20]};
`

export const Label = styled.label`
  font-size: ${theme.fontSize.label.size};
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing[8]};
  display: block;
`

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[14]} ${theme.spacing[16]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.input};
  font-size: ${theme.fontSize.body.size};
  color: ${theme.colors.textPrimary};

&::placeholder{
  color:${theme.colors.textSecondary};
}

&:focus {
  outline: none;
  border-color: ${theme.colors.primary};
}
`;

export const ErrorText = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.caption.size};
  margin-top: ${theme.spacing[4]};
`;


export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing[14]};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radius.button};
  font-weight: ${theme.fontWeight.semiBold};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.hover};
  }
`;

export const LinkRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing[16]};
  margin-top: ${theme.spacing[24]};
  font-size: ${theme.fontSize.caption.size};
  color: ${theme.colors.textSecondary};
`;

export const LinkText = styled.span`
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primary};
  }
`


