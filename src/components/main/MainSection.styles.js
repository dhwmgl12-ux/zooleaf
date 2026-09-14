import styled from "@emotion/styled";
import { theme } from "../../styles/variables";
import { Link } from "react-router-dom";

export const MainSectionContainer = styled.section`
  width: 100%;

  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  gap: ${theme.spacing[64]};
  margin-top: ${theme.spacing[140]};
`

export const MainSectionMoreLink = styled(Link)`
  padding: ${theme.spacing[8]} ${theme.spacing[16]};
  border-radius: ${theme.radius.button};
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.button.size};
  font-weight: ${theme.fontWeight.medium};
  transition: color 0.2s ease, background-color 0.2s ease;
  text-align: center;
  min-width: 20%;

  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 3px;
  }
`

export const MainCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${theme.spacing[24]};

  @media screen and (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;