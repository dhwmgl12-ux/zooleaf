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
  font-size: ${theme.fontSize.h2.size};
  line-height: ${theme.fontSize.h2.lineheight};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[80]};
  margin-top: ${theme.spacing[100]};
  text-align: center;

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
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
`;

export const DiscountSection = styled.section`
  width: 100%;
  max-width: 1000px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[16]};
  margin-bottom: ${theme.spacing[32]};
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
`;

export const CardImageWrap = styled.div`
  width: 200px;
  height: 140px;
  flex-shrink: 0;
  border-radius: ${theme.radius.image};
  overflow: hidden;
  margin-left: ${theme.spacing[64]};
  margin-right: ${theme.spacing[100]};
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
`;

export const SubCond = styled.span`
  display: block;
  font-size: ${theme.fontSize.bodylarge.size};
  line-height: ${theme.fontSize.caption.lineheight};
  color: ${theme.colors.textPrimary};
  margin-top: ${theme.spacing[8]};
  margin-bottom: ${theme.spacing[32]};
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
`;

export const SpecialSection = styled.section`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};
`;

export const SpecialCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  /* 상하좌우 여백 */
  padding: ${theme.spacing[24]} ${theme.spacing[40]};
  display: flex;
  flex-direction: row;
  align-items: center;

  /* 아이콘과 텍스트 사이 간격 */
  gap: ${theme.spacing[100]};
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: 200px;
  margin-bottom: ${theme.spacing[40]};

  p {
    white-space: pre-line; /* \n 문자를 실제 줄바꿈으로 인식 */
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
    color: ${theme.colors.textSecondary};
    margin: 0;
  }
`;

export const SpecialImageWrap = styled.div`
  width: 100px; /* 아이콘 영역 크기를 시안 비율에 맞게 확보 */
  height: 100px;
  flex-shrink: 0;
  display: flex;
  margin-left: ${theme.spacing[100]};
  margin-right: ${theme.spacing[100]};
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
`;
