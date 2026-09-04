import styled from "@emotion/styled";
import { theme } from "../../styles/variables";
import { Link } from "react-router-dom";

export const FormCard = styled.div`
  width: 550px;
  max-width: 550px;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${(props) => props.variant === 'signup' ? '32px 40px' : '52px 38px'};
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[20]};
`;

export const Title = styled.h2 `
  font-size: ${theme.fontSize.h3.size};
  line-height: ${theme.fontSize.h3.lineheight};
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.bold};
  /* margin-bottom: ${theme.spacing[32]}; */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[20]};
`

export const Label = styled.label`
  font-size: ${theme.fontSize.bodylarge.size};
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing[8]};
  display: block;
`

export const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: ${theme.spacing[14]} ${theme.spacing[16]};
  border: 2px solid ${theme.colors.border};
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

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: ${theme.spacing[16]};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${theme.colors.textSecondary};

  &:hover {
    color: ${theme.colors.textPrimary};
  }
`;


export const ErrorText = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.caption.size};
  margin-top: ${theme.spacing[4]};
`;

export const AgreeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  align-items: flex-start;
  align-self: stretch;
`;

export const AgreeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

export const AgreeLeftGroup = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[8]};
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
`;

export const InlineErrorText = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.bodysmall.size};
`;

export const ArrowIcon = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.body.size};
`


export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing[14]};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radius.button};
  font-size: ${theme.fontSize.bodylarge};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.hover};
  }
`;

export const LinkRow = styled.div`
  display: flex;
  width: 348px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  font-size: ${theme.fontSize.bodysmall.size};
  font-weight: 400;
  color: ${theme.colors.textSecondary};
`;

export const LinkText = styled.span`
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primary};
  }
`

export const BottomLinkRow = styled.p `
  text-align: center;
  margin-top: ${theme.spacing[24]};
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textSecondary};
`;

export const BottomLink = styled(Link)`
  color: ${theme.colors.textPrimary};
  text-decoration: underline;
  font-weight: ${theme.fontWeight.medium};
  &:hover {
    color: ${theme.colors.primary}
  }
`


