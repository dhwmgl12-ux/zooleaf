import styled from '@emotion/styled';
import { theme } from '../styles/variables';

import introPCImg from '../assets/images/Intro-pc.png';
import introTabletImg from '../assets/images/Intro-tablet.png';
import introMobileImg from '../assets/images/Intro-mobile.png';
import introSmallImg from '../assets/images/Intro-small.png';

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
  /* 1. PC 기본 배경 이미지 */
  background-image: url(${introPCImg});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding: 0 ${theme.spacing[24]};
  box-sizing: border-box;

  /* 배경 이미지를 <img> 태그처럼 직접 깔아버리기 */
  .hero-bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-image: url(${introPCImg});
    object-position: center center; /* 👈 여기서 위치를 자유롭게 조절 가능합니다! */
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 3; /* 👈 이미지와 오버레이보다 위에 오도록 설정 */
    max-width: 1000px;
    width: 100%;

    .sub-title {
      font-size: ${theme.fontSize.h3.size};
      margin-bottom: ${theme.spacing[12]};
      font-weight: ${theme.fontWeight.regular};
      .small-mobile-br {
        display: none;
      }
    }

    h2 {
      font-size: ${theme.fontSize.h2.size};
      font-weight: ${theme.fontWeight.medium};
      margin: 0;
    }
  }

  /* 태블릿 구간 */
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    height: 547px;

    background-image:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${introTabletImg});

    .hero-content {
      h2 {
        font-size: ${theme.fontSize.h2.size};
      }
      .sub-title {
        font-size: ${theme.fontSize.h3.size};
        .small-mobile-br {
          display: none;
        }
      }
    }
  }

  /* 모바일 구간: 모바일 전용 이미지, 높이 및 폰트 크기 축소 */
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    height: 555px;
    max-width: 723px;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${introMobileImg});

    .hero-content {
      .sub-title {
        font-size: ${theme.fontSize.h4.size};
        .small-mobile-br {
          display: none;
        }
      }
      h1 {
        font-size: ${theme.fontSize.h2.size};
      }
    }
  }

  /* 스몰 모바일 구간: 작은 모바일 전용 이미지 및 세부 폰트 조정 */
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    height: 455px;
    max-width: 343px;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${introSmallImg});
    padding: 0 16px;

    .hero-content {
      .sub-title {
        font-size: ${theme.fontSize.body.size};
        .small-mobile-br {
          display: block;
        }
      }
      h2 {
        font-size: ${theme.fontSize.h5.size};
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
  padding: ${theme.spacing[40]} ${theme.spacing[24]};
  box-sizing: border-box;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding: ${theme.spacing[32]} ${theme.spacing[20]};
    gap: ${theme.spacing[28]};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${theme.spacing[24]} ${theme.spacing[16]};
    gap: ${theme.spacing[24]};
  }
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
        flex-direction: row;
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
      flex-direction: row; /* PC 기본은 가로 정렬 */
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

  /* 태블릿 구간 */
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding: ${theme.spacing[24]};

    h2 {
      font-size: ${theme.fontSize.h3.size};
      margin-bottom: 18px;
    }

    p,
    li {
      font-size: ${theme.fontSize.bodylarge.size};
    }
  }

  /* 모바일 구간 */
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${theme.spacing[20]};

    h2 {
      font-size: ${theme.fontSize.h3.size};
      margin-bottom: 14px;
    }

    p,
    li {
      font-size: ${theme.fontSize.bodylarge.size};
    }

    &.map-block {
      .map-wrap {
        flex-direction: column;
        align-items: flex-start;

        .map-img {
          width: 412px;
          height: 271px;
        }
        .bus-img {
          max-width: 352px;
          height: 271px;
        }
      }
    }
  }

  /* 스몰 모바일 구간 (InfoBlock 내부로 정상 포함) */
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    padding: 0;

    p {
      font-size: ${theme.fontSize.body.size};
    }

    ul {
      li {
        font-size: ${theme.fontSize.body.size};
        word-break: keep-all;
        strong {
          font-size: ${theme.fontSize.body.size};
          font-weight: ${theme.fontWeight.regular};
        }
      }
    }

    &.map-block {
      .map-wrap {
        flex-direction: column;
        align-items: flex-start;

        .map-img {
          width: 100%;
          max-width: 344px;
          height: 227px;
          object-fit: contain;
        }
        .bus-img {
          width: 100%;
          max-width: 344px;
          height: 264px;
          object-fit: contain;
        }
      }
    }
  }
`;
