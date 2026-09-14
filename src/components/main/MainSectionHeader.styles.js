import styled from '@emotion/styled';
import {theme} from '../../styles/variables'

export const MainSectionHeaderContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[24]};

  h2 {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primary};

    position: relative;

    &::after {
      content: "";
      width: 30px;
      height: 2px;
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);

      background-color: ${theme.colors.border};
    }
  }

  p {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
    font-weight: ${theme.fontWeight.bold};
  }
`