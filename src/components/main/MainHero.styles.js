import styled from '@emotion/styled';
import {theme} from '../../styles/variables'

export const MainHeroContainer = styled.div`
  width: 100%;

  .hero-video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
  }
  
  @media (max-width: 767px) {
    .hero-video {
      aspect-ratio: 9 / 16;
    }
  }
`
