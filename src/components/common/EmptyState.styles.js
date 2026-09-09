import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const EmptyStateContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing[80]} 0;
  
  text-align: center;

  h2 {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: ${theme.spacing[16]};
  }

  p {
    margin-bottom: ${theme.spacing[40]};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.textSecondary};
  }

  button {
    padding: ${theme.spacing[20]} ${theme.spacing[56]};
    background-color: ${theme.colors.primary};
    border-radius: ${theme.radius.button};
    color: ${theme.colors.white};

    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.medium};
  }

`