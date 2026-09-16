import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

export const Sidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;
  overflow: visible;
  border-radius: ${theme.radius.box};
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 10px rgba(44, 62, 53, 0.08);
  padding: ${theme.spacing[32]} ${theme.spacing[32]};

  nav button,
  section button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing[16]} ${theme.spacing[20]};
    color: ${theme.colors.textPrimary};
    font-size: ${theme.fontSize.body.size};
    font-weight: ${theme.fontWeight.bold};
    text-align: center;
  }

  nav {
    padding: ${theme.spacing[12]} 0;
  }

  nav button {
    padding-top: ${theme.spacing[20]};
    padding-bottom: ${theme.spacing[20]};
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
    margin: ${theme.spacing[12]} ${theme.spacing[20]} ${theme.spacing[20]};
    border-top: 1px solid ${theme.colors.background2};
    padding-top: ${theme.spacing[16]};
  }

  .filter-dropdown {
    position: relative;
    margin-top: ${theme.spacing[16]};
  }

  .filter-dropdown > button {
    position: relative;
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
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(280px, 310px);
  align-items: center;
  gap: ${theme.spacing[16]};
  padding: ${theme.spacing[8]} ${theme.spacing[16]};

  nav {
    min-width: 0;
    padding: 0;
  }

  nav ul {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  nav button {
    width: 100%;
    min-width: 0;
    padding: ${theme.spacing[16]} ${theme.spacing[8]};
  }

  .filter-options {
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${theme.spacing[12]};
    margin: 0;
    border-top: 0;
    border-left: 1px solid ${theme.colors.background2};
    padding: 0 0 0 ${theme.spacing[16]};
  }

  .filter-dropdown {
    width: auto;
    min-width: 0;
    margin-top: 0;
  }

  .filter-dropdown > button {
    min-width: 0;
    padding-inline: ${theme.spacing[12]};
  }
}

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    display: block;
    padding: 0;
    nav ul { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
    nav button { width: 100%; padding: ${theme.spacing[12]} ${theme.spacing[4]}; font-size: ${theme.fontSize.bodysmall.size}; white-space: nowrap; }
    .filter-options { display: block; margin: 0 ${theme.spacing[16]} ${theme.spacing[16]}; border-top: 1px solid ${theme.colors.background2}; padding: ${theme.spacing[12]} 0 0; }
    .filter-dropdown { width: 100%; }
  }
`;