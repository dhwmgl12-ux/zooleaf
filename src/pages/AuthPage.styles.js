import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const PageWrapper = styled.div`
  display: flex;
`;

export const PageContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-areas: ${(props) => (props.variant === 'signup' ? "'form hero'" : "'hero form'")};
  align-items: center;
  gap: ${theme.spacing[8]} ${theme.spacing[48]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'hero'
      'form'
      'tagline';
    gap: ${theme.spacing[32]};
    justify-content: center;
  }
`;

export const HeroGroup = styled.div`
  grid-area: hero;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[24]};
  padding: ${theme.spacing[40]} 0 0 ${theme.spacing[80]};

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    align-items: center;
    padding: ${theme.spacing[40]} 0 0 0;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    display: contents;
  }
`;

export const IllustrationSide = styled.div`
  display: flex;
  justify-content: ${(props) => (props.variant === 'signup' ? 'flex-end' : 'flex-start')};
  width: 658px;
  max-width: 100%;

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-area: hero;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  max-width: 658px;
  height: auto;

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    max-width: 420px;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 550px;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 100%;
    max-width: 550px;
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 100%;
  }
`;

export const TextGroup = styled.div`
  width: 658px;
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: ${theme.spacing[4]};
  flex-wrap: wrap;

  @media (max-width: ${theme.layout.breakpoint.desktop}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    grid-area: tagline;
  }
`;

export const SubText = styled.p`
  font-size: ${theme.fontSize.h3.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin: 0;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    font-size: ${theme.fontSize.h4.size};
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    font-size: ${theme.fontSize.h5.size};
    max-width: 100%;
  }
`;

export const SubTextLight = styled.p`
  font-size: ${theme.fontSize.h3.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary};
  margin: 0;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    font-size: ${theme.fontSize.h4.size};
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    font-size: ${theme.fontSize.h5.size};
    max-width: 100%;
  }
`;

export const FormSide = styled.div`
  grid-area: form;
  display: flex;
  justify-content: center;
  align-items: center;
`;
