import styled from '@emotion/styled';
import { theme } from '../styles/variables';
import introPCImg from '../assets/images/Intro-pc.png';
import introTabletImg from '../assets/images/Intro-tablet.png';
import introMobileImg from '../assets/images/Intro-mobile.png';
import introsmallImg from '../assets/images/Intro-small.png';

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${theme.spacing[64]};
`;

export const HeroSection = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 450px;

  background-image:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${introPCImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f6f0;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding: 40px ${theme.spacing[24]};

  .hero-content {
    max-width: 1000px;
    width: 100%;

    .sub-title {
      font-size: ${theme.fontSize.h3.size};
      margin-bottom: ${theme.spacing[12]};
      font-weight: ${theme.fontWeight.regular};
      word-break: keep-all;
    }

    h2 {
      font-size: ${theme.fontSize.h2.size};
      font-weight: ${theme.fontWeight.bold};
      margin: 0;
      word-break: keep-all;
    }
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    background-position: right center;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${introTabletImg});
    max-width: 100%;
    height: 547px;
    .hero-content {
      max-width: 100%;
      width: 100%;
      padding: 0 16px;

      .sub-title {
        font-size: ${theme.fontSize.h3.size};
        margin-bottom: ${theme.spacing[12]};
        font-weight: ${theme.fontWeight.regular};
      }

      h2 {
        font-size: ${theme.fontSize.h2.size};
        font-weight: ${theme.fontWeight.bold};
        margin: 0;
      }
    }
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    background-position: right center;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${introMobileImg});
    max-width: 100%;
    height: 555px;
    .hero-content {
      max-width: 100%;
      width: 100%;
      padding: 0 16px;

      .sub-title {
        font-size: ${theme.fontSize.h4.size};
        margin-bottom: ${theme.spacing[12]};
        font-weight: ${theme.fontWeight.regular};
      }

      h2 {
        font-size: ${theme.fontSize.h3.size};
        font-weight: ${theme.fontWeight.bold};
        margin: 0;
      }
    }
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    background-position: center;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${introsmallImg});
    width: 100%;
    max-width: 100%;
    min-height: 375px;
    height: auto;
    margin-bottom: ${theme.spacing[100]};
    .hero-content {
      max-width: 100%;
      width: 100%;
      padding: 0;

      .sub-title {
        font-size: ${theme.fontSize.bodysmall.size};
        margin-bottom: 8px;
        word-break: keep-all;
      }

      h2 {
        font-size: ${theme.fontSize.h6.size};
        font-weight: ${theme.fontWeight.bold};
        margin: 0;
        word-break: keep-all;
      }
    }
  }
`;

export const ContentSection = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[32]};
  /* 모바일에서 양옆 여백이 과도하지 않도록 패딩 조정 */
  padding: ${theme.spacing[40]} 16px;

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    padding: ${theme.spacing[4]};
  }
`;

export const InfoBlock = styled.div`
  background-color: transparent;
  padding: 0;
  width: 100%;

  h2 {
    font-size: ${theme.fontSize.h3.size};
    color: ${theme.colors.primary};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: ${theme.spacing[16]};
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

      /* 기본 상태(PC/태블릿)에서는 모바일용 줄바꿈을 숨김 */
      .mobile-br {
        display: none;
      }

      strong {
        color: ${theme.colors.textPrimary};
        font-weight: ${theme.fontWeight.regular};
      }
    }
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    h2 {
      font-size: ${theme.fontSize.h4.size};
      margin-bottom: ${theme.spacing[24]};
    }

    p,
    ul li {
      font-size: ${theme.fontSize.bodysmall.size};
      word-break: keep-all;

      /* smallMobile 화면에서만 줄바꿈 표시 */
      .mobile-br {
        display: inline;
      }
    }
  }

  &.map-block {
    /* ... 기존 오시는 길 스타일 유지 ... */
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

    @media (max-width: ${theme.layout.breakpoint.mobile}) {
      .map-wrap {
        flex-direction: column;

        .map-img,
        .bus-img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`;
