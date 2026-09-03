import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const HeaderContainer = styled.header`
  width: 100%;
  color: ${theme.colors.textPrimary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  .header__logo {
    width: 200px;
    height: auto;
  }

  .header__logo img {
    width: 100%;
  }

  .header__nav-list {
    display: flex;
    gap: ${theme.spacing[56]};
    font-size: ${theme.fontSize.h5};
    font-weight: ${theme.fontWeight.semiBold};
  }

  .header__nav-list li:hover {
    color: ${theme.colors.primary};
  }

  .header__utils {
    display: flex;
    gap: ${theme.spacing[32]};
    align-items: center;
  }

  // 호버 색상 문제 생김...
  .header__utils li:hover {
 
  }
  
`