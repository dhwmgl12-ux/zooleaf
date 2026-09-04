import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const HeaderContainer = styled.header`
  width: 100%;
  color: ${theme.colors.textPrimary};
  
  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing[16]} 0;
  }

  .header__logo {
    width: 200px;
  }
  
  .header__logo img {
    width: 100%;
    height: auto;
  }

  .header__nav-list {
    display: flex;
    gap: ${theme.spacing[56]};
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.semiBold};
  }

  .header__nav list a {
    transition: color 0.2s ease;
  }

  .header__nav-list a:hover,
  .header__nav-list a:focus-visible  {
    color: ${theme.colors.primary};
  }

  .header__utils {
    display: flex;
    align-items: center;
    gap: ${theme.spacing[32]};
  }

  .header__utils .icon {
    color: inherit;
    transition: color 0.2s ease;
  }

  .header__utils a:hover,
  .header__utils button:hover,
  .header__utils a:focus-visible,
  .header__utils button:focus-visible {
    color: red;
  }
`