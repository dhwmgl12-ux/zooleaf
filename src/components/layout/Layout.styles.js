import styled from "@emotion/styled";
import { theme } from "../../styles/variables.js";

export const MainContainer = styled.main`
  width: 100%;
  padding-bottom: ${theme.spacing[200]};
  background-color: ${({ $isMainPage }) => $isMainPage ? theme.colors.background : theme.colors.background2 };
`