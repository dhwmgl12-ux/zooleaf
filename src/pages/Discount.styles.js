import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const DiscountPage = styled.div`
  background-color: ${theme.colors.background2};
  min-height: 100vh;
  padding: ${theme.spacing[32]} ${theme.spacing[16]} ${theme.spacing[64]};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`;

/* 1. 제휴 할인 섹션: PC에서는 1번, 태블릿에서는 2번 */
export const DiscountSection = styled.section`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: ${theme.spacing[32]};
  order: 1;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${theme.spacing[16]};
    order: 2; /* 태블릿부터는 주의사항 아래로 이동 */
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    order: 2;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    order: 2;
  }
`;

/* 2. 주의사항 박스: PC에서는 배경 없이 한 줄 정렬, 태블릿에서는 1번(최상단 박스) */
export const NoticeBox = styled.div`
  /* [태블릿 및 모바일용 기본 스타일: 배경 박스 형태] */
  width: 100%;
  max-width: 1000px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: ${theme.spacing[24]};
  order: 2;

  h3 {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.error};
    margin: 0 0 12px 0;
  }

  p {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.body.lineheight};
    color: ${theme.colors.error};
    margin: 0;
  }

  /* [PC 화면 전용 스타일: 배경박스 제거 및 한 줄 가로 배열] */
  @media (min-width: calc(${theme.layout.breakpoint.tablet} + 1px)) {
    background-color: transparent;
    padding: 0;
    margin-bottom: ${theme.spacing[16]};
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    order: 2;
    width: 100%;
    max-width: 1440px;

    h3 {
      margin: 0;
      font-size: ${theme.fontSize.body.size};
    }

    p {
      margin: 0;
      font-size: ${theme.fontSize.body.size};
    }
  }

  /* [태블릿 이하 화면 스타일: 기존 박스 형태 유지] */
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    order: 1; /* 태블릿에서는 최상단으로 이동 */
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
    order: 1;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 343px;
    order: 1;
  }
`;

/* 3. 우대 적용 헤더: PC 그리드 폭에 맞춤 */
export const SpecialHeader = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${theme.spacing[24]} ${theme.spacing[24]};
  text-align: center;
  margin-bottom: ${theme.spacing[48]};
  margin-top: ${theme.spacing[140]};
  box-sizing: border-box;
  order: 3;

  h2 {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.error};
    margin: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    margin-top: ${theme.spacing[40]};
    order: 3;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
    margin-top: ${theme.spacing[40]};
    order: 3;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 343px;
    order: 3;
  }
`;

/* 4. 우대 적용 섹션: PC 최대 너비를 1440px로 확장 */
export const SpecialSection = styled.section`
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  order: 4;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${theme.spacing[16]};
    order: 4;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    order: 4;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    order: 4;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${theme.fontSize.h3.size};
  line-height: ${theme.fontSize.h2.lineheight};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[80]};
  margin-top: ${theme.spacing[100]};
  text-align: center;

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
  }
`;

export const DiscountCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${theme.spacing[24]};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing[32]};
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 400px;
  flex-shrink: 0;

  margin-bottom: ${theme.spacing[24]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    height: 410px;
    padding: ${theme.spacing[24]};
    gap: ${theme.spacing[32]};
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
    height: 410px;
    padding: ${theme.spacing[24]};
    gap: ${theme.spacing[8]};
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    flex-direction: column;
    height: auto;
    align-items: center;
    text-align: center;
    gap: ${theme.spacing[16]};
    padding: ${theme.spacing[24]};
    > div:first-of-type {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

export const CardImageWrap = styled.div`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  border-radius: ${theme.radius.image};
  overflow: hidden;
  margin-left: ${theme.spacing[20]};
  margin-right: ${theme.spacing[20]};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-left: ${theme.spacing[64]};
    margin-right: ${theme.spacing[100]};
  }
`;

export const CardInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[14]};
  flex: 1;
  min-width: 0;

  h2 {
    font-size: ${theme.fontSize.h4.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.textPrimary};
    margin-bottom: ${theme.spacing[4]};
  }

  p {
    font-weight: ${theme.fontWeight.medium};
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: 1.4;
    color: ${theme.colors.textPrimary};
    margin: 0;
    word-break: break-all;

    strong {
      color: ${theme.colors.textPrimary};
      font-weight: ${theme.fontWeight.medium};
    }
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    > p {
      font-size: ${theme.fontSize.body.size};
      align-items: center;
      text-align: center;
      width: 100%;
    }
  }
`;

export const ConditionArea = styled.div`
  margin-top: ${theme.spacing[12]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};

  > strong {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    color: ${theme.colors.textPrimary};
    font-weight: ${theme.fontWeight.bold};
    display: block;
  }

  > p {
    font-weight: ${theme.fontWeight.medium};
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    color: ${theme.colors.textPrimary};
    margin: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    > p {
      font-size: ${theme.fontSize.body.size};
    }
    padding: 0;
    gap: 0;
  }
`;

export const SubCond = styled.span`
  display: block;
  font-size: ${theme.fontSize.bodylarge.size};
  line-height: ${theme.fontSize.caption.lineheight};
  color: ${theme.colors.textPrimary};
  margin-top: ${theme.spacing[8]};
  margin-bottom: ${theme.spacing[32]};

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    font-size: ${theme.fontSize.body.size};
  }
`;

export const SpecialCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${theme.spacing[24]} ${theme.spacing[40]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* 양쪽 끝으로 정렬하여 공간 확보 */
  gap: ${theme.spacing[24]}; /* 간격을 너무 넓게 잡지 않고 유연하게 조절 */
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 200px;
  margin-bottom: ${theme.spacing[40]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    height: 200px;
    padding: ${theme.spacing[24]} ${theme.spacing[40]};
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
    height: 200px;
    padding: ${theme.spacing[24]} ${theme.spacing[40]};
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    flex-direction: column;
    height: auto;
    align-items: center;
    text-align: center;
    gap: ${theme.spacing[16]};
    padding: ${theme.spacing[24]};
    margin-left: auto;
    margin-right: auto;
  }
`;

export const SpecialTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};
  flex: 1;
  min-width: 0;

  p {
    font-size: ${theme.fontSize.body.size};
    line-height: 1.5;
    color: ${theme.colors.textPrimary};
    margin: 0;
    text-align: left;
    word-break: keep-all;
    white-space: pre-line; /* 👈 이 코드가 있어야 \n을 인식하여 줄바꿈이 정상 적용됩니다! */
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    align-items: center;

    p {
      font-size: ${theme.fontSize.body.size};
      text-align: center;
      white-space: pre-line; /* 모바일 대응 시에도 유지 */
    }
  }
`;

export const SpecialImageWrap = styled.div`
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${theme.spacing[20]};
  margin-right: ${theme.spacing[140]};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
