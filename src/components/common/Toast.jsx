import { useEffect } from "react";
import useToastStore from "../../store/toastStore"
import { theme } from "../../styles/variables"
import styled from "@emotion/styled";

export default function Toast() {
  const message = useToastStore((state) => state.message);
  const hideToast = useToastStore((state) => state.hideToast);

  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      hideToast();
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, hideToast]);

  if (!message) return null;

  return <ToastWrapper>{message}</ToastWrapper>;
}

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;

  padding: 14px 24px;
  border-radius: ${theme.radius.button};
  background-color: ${theme.colors.textPrimary};
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.body.size};
  user-select: none;
`;