import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const TopButton = styled.button`
  position: fixed;
  right: ${theme.spacing[24]};
  bottom: ${theme.spacing[24]};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.15);
  z-index: 500;

  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.$visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease, visibility 0.3s ease, background 0.2s ease;

  &:hover {
    background: ${theme.colors.hover};
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    right: ${theme.spacing[16]};
    bottom: ${theme.spacing[16]};
    width: 40px;
    height: 40px;
  }
`;