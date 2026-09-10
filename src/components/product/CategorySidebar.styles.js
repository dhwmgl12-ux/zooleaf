import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const Sidebar = styled.aside`
  width: 170px;
  flex-shrink: 0;
  overflow: visible;
  border-radius: ${theme.radius.box};
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 10px rgba(44, 62, 53, 0.08);

  nav button,
  section button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing[12]} ${theme.spacing[16]};
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.label.size};
    font-weight: ${theme.fontWeight.bold};
    text-align: center;
  }

  nav button[aria-pressed='true'] {
    color: ${theme.colors.primary};
  }

  nav button:hover {
    background-color: transparent;
    color: ${theme.colors.textSecondary};
  }

  nav button[aria-pressed='true']:hover {
    color: ${theme.colors.primary};
  }

  section button:hover {
    background-color: ${theme.colors.background2};
    color: ${theme.colors.primary};
  }

  .filter-options {
    margin: ${theme.spacing[8]} ${theme.spacing[16]} ${theme.spacing[16]};
    border-top: 1px solid ${theme.colors.background2};
    padding-top: ${theme.spacing[12]};
  }

  .filter-dropdown {
    position: relative;
    margin-top: ${theme.spacing[8]};
  }

  .filter-dropdown > button {
    position: relative;
    border: 1px solid ${theme.colors.background2};
    border-radius: ${theme.radius.button};
  }

  .filter-dropdown > button span {
    position: absolute;
    right: ${theme.spacing[16]};
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

  section button[aria-pressed='true'] {
    background-color: ${theme.colors.background2};
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 100%;
    nav ul { display: flex; justify-content: space-around; }
    nav button { width: auto; padding: ${theme.spacing[16]}; }
    .filter-options { display: flex; gap: ${theme.spacing[16]}; justify-content: center; margin: 0; border-top: 0; padding: 0 ${theme.spacing[16]} ${theme.spacing[16]}; }
    .filter-dropdown { width: min(220px, 50%); }
  }
`;
