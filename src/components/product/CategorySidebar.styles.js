import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const Sidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;

  overflow: visible;
  border-radius: ${theme.radius.box};
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 10px rgba(44, 62, 53, 0.08);
  padding: ${theme.spacing[32]};

  nav {
    padding-bottom: ${theme.spacing[16]};
  }

  nav ul {
    display: flex;
    flex-direction: column;
  }

  nav button,
  section button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing[8]} ${theme.spacing[16]};
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.h6.size};
    line-height: ${theme.fontSize.h6.lineheight};
    font-weight: ${theme.fontWeight.semiBold};
    text-align: center;
  }

  nav button:hover {
    background-color: transparent;
    color: ${theme.colors.textSecondary};
  }

  nav button[aria-pressed='true']:hover {
    color: ${theme.colors.textSecondary};
  }

  section button:hover {
    background-color: ${theme.colors.background2};
    color: ${theme.colors.primary};
  }

  .filter-options {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing[16]};

    border-top: 1px solid ${theme.colors.background2};
    padding-top: ${theme.spacing[16]};
  }

  .filter-dropdown {
    position: relative;
    width: 100%;
  }

  .filter-dropdown > button {
    position: relative;
    width: 100%;
    min-height: ${theme.spacing[48]};
    justify-content: flex-start;

    border: 1px solid ${theme.colors.background2};
    border-radius: ${theme.radius.button};
  }

  .filter-arrow {
    position: absolute;
    right: ${theme.spacing[16]};
    width: 7px;
    height: 7px;
    border-right: 1px solid ${theme.colors.textSecondary};
    border-bottom: 1px solid ${theme.colors.textSecondary};
    transform: rotate(45deg) translateY(-2px);
    transition: transform 0.2s ease;
  }

  .filter-dropdown > button[aria-expanded='true'] .filter-arrow {
    transform: rotate(225deg) translateY(-2px);
  }

  .filter-dropdown ul {
    position: absolute;
    z-index: 1;
    top: calc(100% + ${theme.spacing[4]});
    width: 100%;
    overflow: hidden;
    border: 1px solid ${theme.colors.background2};
    border-radius: ${theme.radius.input};
    background-color: ${theme.colors.white};
    box-shadow: 0 4px 10px rgba(44, 62, 53, 0.1);
  }

  .filter-dropdown li + li {
    border-top: 1px solid ${theme.colors.background2};
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing[16]};
    padding: ${theme.spacing[8]} ${theme.spacing[16]};

    nav {
      min-width: 0;
      flex: 1 1 auto;
      padding: 0;
    }

    nav ul {
      flex-direction: row;
    }

    nav li {
      min-width: 0;
      flex: 1 1 0;
    }

    nav button {
      min-width: 0;
      white-space: nowrap;
    }

    .filter-options {
      min-width: 0;
      flex: 0 1 310px;
      flex-direction: row;
      align-items: stretch;
      gap: ${theme.spacing[12]};

      border-top: 0;
      border-left: 1px solid ${theme.colors.background2};
      padding: 0 0 0 ${theme.spacing[16]};
    }

    .filter-dropdown {
      width: auto;
      min-width: 0;
      flex: 1 1 0;
    }

    .filter-dropdown > button {
      min-width: 0;
      white-space: nowrap;
    }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: ${theme.spacing[24]};

    nav {
      width: 100%;
      padding-bottom: ${theme.spacing[16]};
    }

    nav ul {
      flex-direction: row;
    }

    nav li {
      min-width: 0;
      flex: 1 1 0;
    }

    nav button {
      min-width: 0;
      white-space: nowrap;
    }
    
    nav button,
    section button {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }

    .filter-options {
      width: auto;
      min-width: 0;
      max-width: 100%;
      align-self: stretch;
      flex: 0 0 auto;
      flex-direction: column;
      gap: ${theme.spacing[12]};
        
      border-top: 1px solid ${theme.colors.background2};
      border-left: 0;
      padding: ${theme.spacing[16]} 0 0;
    }

    .filter-dropdown {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      flex: 0 0 auto;
    }

    .filter-dropdown > button {
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
  }
`;