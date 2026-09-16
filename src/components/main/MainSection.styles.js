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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${theme.spacing[24]};

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    ${({ $showOnlyTwo }) =>
      $showOnlyTwo && `> li:nth-of-type(n + 4) { display: none; }`}
  }

  @media screen and (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    ${({ $showOnlyTwo }) =>
      $showOnlyTwo && `> li:nth-of-type(n + 3) { display: none; }`}
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const MainSliderContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MainSliderList = styled.ul`
  display: flex;
  width: 100%;
  gap: ${theme.spacing[24]};

  padding-block: ${({ $variant }) =>
    $variant === "goods"
      ? `${theme.spacing[16]} ${theme.spacing[24]}`
      : "0"};

  padding-inline: ${({ $variant }) =>
    $variant === "goods"
      ? theme.spacing[12]
      : "0"};

  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > li {
    min-width: 0;
    flex: ${({ $variant }) =>
      $variant === "goods"
        ? "0 0 21%"
        : "0 0 calc((100% - 4.5rem) / 4)"};

    scroll-snap-align: start;
  }

  @media screen and (max-width: ${theme.layout.breakpoint.desktop}) {
    justify-content: flex-start;

    > li {
      flex: ${({ $variant }) =>
        $variant === "goods"
          ? "0 0 45%"
          : "0 0 312px"};
    }
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    > li {
      flex: ${({ $variant }) =>
        $variant === "goods"
          ? "0 0 82%"
          : "0 0 min(82%, 312px)"};
    }
  }
`;

export const MainSliderButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 2;

  display: ${({ $tabletOnly }) =>
    $tabletOnly ? "none" : "grid"};

  width: 48px;
  height: 48px;
  padding: 0;
  place-items: center;

  border-radius: 50%;
  background-color: rgb(255 255 255 / 80%);
  color: ${theme.colors.textSecondary};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));
  

  transform: translateY(-50%);
  cursor: pointer;

  ${({ $direction }) =>
    $direction === "previous"
      ? "left: -24px;"
      : "right: -24px;"}

  &:hover {
    background-color: ${theme.colors.background2};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media screen and (max-width: ${theme.layout.breakpoint.desktop}) {
    display: grid;

    ${({ $direction }) =>
      $direction === "previous"
        ? "left: 8px;"
        : "right: 8px;"}
  }
`;