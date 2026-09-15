import styled from "@emotion/styled";
import { theme } from "../../styles/variables";

export const LoadingSpinnerContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: ${theme.spacing[80]} 0;

  h2 {
    margin-top: ${theme.spacing[40]};
    font-size: ${theme.fontSize.h4.size};
    font-weight: ${theme.fontWeight.bold}
  }

  p {
    margin-top: ${theme.spacing[14]};
  }

  .loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;

    background: 
      radial-gradient(
        farthest-side,
        ${theme.colors.primary} 94%,
        #0000
      ) top / 8px 8px no-repeat,
      conic-gradient(
        #0000 30%,
        ${theme.colors.primary}
      );

    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 8px),
      #000 0
    );

    mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 8px),
      #000 0
    );

    animation: l13 1s infinite linear;
  }

  @keyframes l13 {
    100% {
      transform: rotate(1turn);
    }
  }
`