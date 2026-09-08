import styled from '@emotion/styled';
import { theme } from '../styles/variables';
import introPCImg from '../assets/images/Intro-tablet.png';

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: ${theme.spacing[64]};
`;

export const HeroSection = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 500px;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${introPCImg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f6f0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding: 0 ${theme.spacing[24]};
  box-sizing: border-box;

  .hero-content {
    max-width: 1000px;
    width: 100%;

    .sub-title {
      font-size: ${theme.fontSize.bodylarge.size};
      margin-bottom: ${theme.spacing[12]};
      font-weight: ${theme.fontWeight.medium};
    }

    h1 {
      font-size: ${theme.fontSize.h2.size};
      font-weight: ${theme.fontWeight.bold};
      margin: 0;
    }
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[32]};
  padding: ${theme.spacing[40]} ${theme.spacing[24]};
  box-sizing: border-box;
`;

export const InfoBlock = styled.div`
  background-color: transparent;
  padding: ${theme.spacing[32]};
  box-sizing: border-box;
  width: 100%;

  h2 {
    font-size: ${theme.fontSize.h3.size};
    color: ${theme.colors.primary};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: ${theme.spacing[24]};
  }

  p {
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: 1.6;
    color: ${theme.colors.textPrimary};
    margin: 0;
    white-space: pre-line;
    word-break: keep-all;
  }

  ul {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing[8]};

    li {
      font-size: ${theme.fontSize.bodylarge.size};
      line-height: 1.5;
      color: ${theme.colors.textPrimary};

      strong {
        color: ${theme.colors.textPrimary};
        font-weight: ${theme.fontWeight.regular};
      }
    }
  }

  &.map-block {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing[20]};

    .transport-info {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing[12]};

      .transport-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        strong {
          font-size: ${theme.fontSize.body.size};
          font-weight: ${theme.fontWeight.bold};
          color: #222222;
        }

        p {
          color: #555555;
        }
      }

      .address {
        margin-top: ${theme.spacing[8]};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.colors.primary};
      }
    }

    .map-wrap {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: ${theme.spacing[16]};
      margin-top: ${theme.spacing[16]};

      .map-img {
        width: 412px;
        height: 271px;
        object-fit: cover;
        object-position: center top;
      }

      .bus-img {
        width: 352px;
        height: 271px;
        object-fit: cover;
        object-position: center top;
      }
    }
  }
`;
