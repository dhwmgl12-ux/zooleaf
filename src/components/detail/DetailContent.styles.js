import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const DetailContentContainer = styled.section`
  width: 100%;
`

export const DetailTabs = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: ${theme.spacing[100]};

  li {
    padding: ${theme.spacing[20]} ${theme.spacing[100]};
    border-bottom: 1px solid ${theme.colors.textPrimary};
  }
`

export const DetailTabLink = styled.a`
  color: ${({ $isActive }) => $isActive ? theme.colors.primary : theme.colors.textPrimary};
`

export const DetailDescription = styled.section`
  width: 100%;
`

export const DetailImageViewport = styled.div`
  position: relative;

  width: 100%;
  max-height: ${({ $isExpanded }) => $isExpanded ? "none" : "1000px"};

  overflow: hidden;

  img {
    display: block;
    width: min(80%, 700px);
    max-width: 100%;
    height: auto;
    margin-inline: auto;
  }

  ${({ $isExpanded }) =>
    !$isExpanded &&
    `
      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100px;
        pointer-events: none;
      }
    `}

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    img {
      width: 100%;
    }
  }
`

export const DetailToggleButton = styled.button`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing[12]};

  width: 100%;
  height: 48px;
  margin-top: -1px;

  border: 1px solid ${theme.colors.primary};
  border-radius: 6px;

  background-color: ${theme.colors.white};
  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.body.size};
  font-weight: ${theme.fontWeight.semiBold};

  cursor: pointer;

  svg {
    color: ${theme.colors.textSecondary};
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(180deg)" : "rotate(0deg)"};

    transition: transform 0.2s ease;
  }

  &:hover {
    border-color: ${theme.colors.hover};
    color: ${theme.colors.primary};
  }
`;


export const DetailInfoSection = styled.section`
  width: 100%;

  margin-top: ${theme.spacing[100]};

  h2 {
    font-size: ${theme.fontSize.h4.size};
    line-height: ${theme.fontSize.h4.lineheight};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: ${theme.spacing[24]};
  }

  ul > li {
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
    margin-bottom: ${theme.spacing[16]};
    list-style: disc inside;
  }
  
  ul > li:last-of-type {
    margin-bottom: 0;
  }
`
