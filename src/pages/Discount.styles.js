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

export const NoticeBox = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};

  /* 시안 기준 패딩 적용: 상하 24px, 좌우 40px */
  padding: 24px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: ${theme.spacing[24]};

  h3 {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.error};
    margin: 0 0 12px 0; /* 제목과 아래 본문 사이 간격 제어 */
  }

  p {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.body.lineheight};
    color: ${theme.colors.error};
    margin: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 343px;
  }
`;

export const DiscountSection = styled.section`
  width: 100%;
  max-width: 1000px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[16]};
  margin-bottom: ${theme.spacing[32]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 100%;
    width: 100%;
    align-items: center; /* 👈 태블릿에서도 중앙 정렬 유지 */
    padding: 0 ${theme.spacing[16]};
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 100%;
    width: 100%;
    align-items: center; /* 👈 태블릿에서도 중앙 정렬 유지 */
    padding: 0;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 100%;
    width: 100%;
    align-items: center; /* 👈 태블릿에서도 중앙 정렬 유지 */
    padding: 0;
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
  max-width: 1000px;
  height: 400px;
  flex-shrink: 0;

  margin-bottom: ${theme.spacing[24]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    height: 410px;
    padding: ${theme.spacing[24]};
    gap: ${theme.spacing[32]};
    margin-left: auto; /* 👈 미디어쿼리 안에서도 중앙 정렬 유지 */
    margin-right: auto;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
    height: 410px;
    padding: ${theme.spacing[24]};
    gap: ${theme.spacing[8]};
    margin-left: auto; /* 👈 미디어쿼리 안에서도 중앙 정렬 유지 */
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
`;

export const CardImageWrap = styled.div`
  width: 200px;
  height: 140px;
  flex-shrink: 0;
  border-radius: ${theme.radius.image};
  overflow: hidden;
  margin-left: ${theme.spacing[64]};
  margin-right: ${theme.spacing[200]};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CardInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[14]}; /* 항목들 사이의 간격 미세 조정 */
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
`;

export const ConditionArea = styled.div`
  margin-top: ${theme.spacing[12]}; /* 혜택 정보와 '이용 조건' 사이 간격 */
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};

  /* '이용 조건' 타이틀 */
  > strong {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    color: ${theme.colors.textPrimary};
    font-weight: ${theme.fontWeight.bold};
    display: block;
  }

  /* 조건 본문 텍스트 */
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

export const SpecialHeader = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};

  padding: ${theme.spacing[24]} ${theme.spacing[24]};

  text-align: center;
  margin-bottom: ${theme.spacing[48]};
  margin-top: ${theme.spacing[140]};
  box-sizing: border-box;
  h2 {
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h5.lineheight};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.error};
    margin: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    magin-top: ${theme.spacing[200]};
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 726px;
    magin-top: ${theme.spacing[200]};}
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 343px;
  }
`;

export const SpecialSection = styled.section`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 100%;
    width: 100%;
    align-items: center;
    padding: 0 ${theme.spacing[16]};
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 100%;
    width: 100%;
    align-items: center;
    padding: 0;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    max-width: 100%;
    width: 100%;
    align-items: center; /* 👈 태블릿에서도 중앙 정렬 유지 */
    padding: 0;
  }
`;

export const SpecialCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${theme.spacing[24]} ${theme.spacing[40]};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing[100]};
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: 200px;
  margin-bottom: ${theme.spacing[40]};

  p {
    white-space: pre-line;
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
    color: ${theme.colors.textPrimary};
    margin: 0;
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 816px;
    height: 200px;
    gap: ${theme.spacing[100]};
    padding: ${theme.spacing[24]} ${theme.spacing[40]};
    margin-bottom: ${theme.spacing[40]};
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    max-width: 826px;
    height: 200px;
    gap: ${theme.spacing[64]};
    padding: ${theme.spacing[24]} ${theme.spacing[40]};
    margin-bottom: ${theme.spacing[40]};
    margin-left: auto;
    margin-right: auto;
  } /* 👈 여기에 닫는 중괄호 추가 완료 */

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    flex-direction: column;
    height: auto;
    align-items: center;
    text-align: center; /* 👈 카드 전체 텍스트 중앙 정렬 */
    gap: ${theme.spacing[16]};
    padding: ${theme.spacing[24]};
    margin-left: auto;
    margin-right: auto;

    > div:first-of-type {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

export const SpecialTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[24]};
  flex: 1;
  min-width: 0;

  p {
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    color: ${theme.colors.textPrimary};
    margin: 0;
    text-align: left;
    word-break: keep-all;
  }

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    align-items: center; /* 👈 375px에서 내부 텍스트 영역도 가운데 정렬 */

    p {
      font-size: ${theme.fontSize.body.size};
      text-align: center; /* 👈 텍스트 문구들도 정가운데로 정렬 */
    }
  }
`;
export const SpecialImageWrap = styled.div`
  width: 100px; /* 아이콘 영역 크기를 시안 비율에 맞게 확보 */
  height: 100px;
  flex-shrink: 0;
  display: flex;
  margin-left: ${theme.spacing[100]};
  margin-right: ${theme.spacing[200]};
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
