import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const PageWrapper = styled.div`
display: flex;
flex: 1;
min-height: 732px;
`;

export const PageContainer = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing[48]};
  width: 100%;
`;


export const IllustrationSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: ${theme.spacing[40]} 0 ${theme.spacing[80]} ${theme.spacing[80]};
`;

export const HeroGroup = styled.div`
  display: flex;
  width: 658px;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing[8]};
`;

export const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  /* margin-bottom: ${theme.spacing[24]}; */
`;

export const TextGroup = styled.div`
  width: 658px;
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing[4]};
  flex-shrink:0;
`


export const SubText = styled.p`
  font-size: ${theme.fontSize.h3.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  text-align: left;
  margin: 0;
  `;

export const SubTextLight = styled.p`
  font-size: ${theme.fontSize.h3.size};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary};
  text-align: center;
  margin: 0;
`;

export const FormSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[40]} 0;
`;

