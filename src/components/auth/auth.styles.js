import styled from '@emotion/styled';
import { theme } from '../../styles/variables';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';

export const FormCard = styled.div`
  width: 550px;
  max-width: 100%;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${(props) => (props.variant === 'signup' ? '32px 40px' : '52px 38px')};
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[20]};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${(props) => (props.variant === 'signup' ? '24px 20px' : '32px 20px')};
  }
`;

export const Title = styled.h2`
  font-size: ${theme.fontSize.h3.size};
  line-height: ${theme.fontSize.h3.lineheight};
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.bold};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    font-size: ${theme.fontSize.h4.size};
    line-height: ${theme.fontSize.h4.lineheight};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[20]};
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.bodylarge.size};
  color: ${theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing[8]};
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: ${theme.spacing[14]} ${theme.spacing[16]};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.radius.input};
  font-size: ${theme.fontSize.body.size};
  color: ${theme.colors.textPrimary};

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    height: 35px;
    font-size: ${theme.fontSize.bodysmall.size};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  input {
    padding-right: 48px;
  }
`;

export const CheckIdRow = styled.div`
  display: flex;
  gap: ${theme.spacing[8]};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-wrap: wrap;
  }
`;

export const CheckIdButton = styled.button`
  flex-shrink: 0;
  padding: 0 ${theme.spacing[16]};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.radius.input};
  background: ${theme.colors.white};
  color: ${theme.colors.textPrimary};
  font-size: ${theme.fontSize.bodysmall.size};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    height: 35px;
    flex: 1 1 100%;
  }
`;

export const SuccessText = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.caption.size};
  margin-top: ${theme.spacing[4]};
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

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${theme.colors.primary};
  cursor: pointer;
  flex-shrink: 0;
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
  gap: ${theme.spacing[8]};
  align-self: stretch;
`;

export const AgreeLeftGroup = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[8]};
  font-size: ${theme.fontSize.bodysmall.size};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  min-width: 0;
`;

export const InlineErrorText = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.bodysmall.size};
`;

export const ArrowIcon = styled.button`
  flex-shrink: 0;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.body.size};
`;

export const FormErrorText = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.caption.size};
  text-align: center;
  margin: 0 0 ${theme.spacing[8]} 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing[14]};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radius.button};
  font-size: ${theme.fontSize.bodylarge.size};
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${theme.colors.hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LinkRow = styled.div`
  display: flex;
  width: 348px;
  max-width: 100%;
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
`;

export const BottomLinkRow = styled.p`
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
    color: ${theme.colors.primary};
  }
`;

const anime = keyframes`
  0%, 20% {transform: translateX(0);}
  80%, 100% {transform: translateX(calc(-1 * var(--marquee-distance, 0px)));}
`;

export const FakePlaceHolder = styled.span`
  position: absolute;
  inset: 0 48px 0 ${theme.spacing[16]};
  display: flex;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
`;

export const FakePlaceHolderText = styled.span`
  display: inline-block;
  white-space: nowrap;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSize.body.size};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    font-size: ${theme.fontSize.bodysmall.size};
    animation: ${anime} 6s ease infinite;
  }
`;
