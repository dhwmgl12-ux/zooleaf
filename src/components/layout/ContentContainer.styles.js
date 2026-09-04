import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const ContentContainer = styled.div`
  width: 100%;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding-inline: ${theme.spacing[40]};
  
  @media screen and (max-width: ${theme.layout.breakpoint.tablet}) {
    padding-inline: ${theme.spacing[20]};
  }

  @media screen and (max-width: ${theme.layout.breakpoint.mobile}) {
    padding-inline: ${theme.spacing[20]};
  }

  @media screen and (max-width: ${theme.layout.breakpoint.smallMobile}) {
    padding-inline: ${theme.spacing[16]};
  }
`