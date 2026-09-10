/* 추가예정 */
import styled from "@emotion/styled";
import { theme } from "../styles/variables";

// 전체 페이지
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  color: ${theme.colors.textPrimary};

  @media (max-width: 767px) {
    gap: 16px;
  }
`;

// 페이지 제목과 설명
export const PageHeader = styled.header`
  margin-bottom: 16px;

  h1 {
    margin-bottom: 12px;
    font-size: 40px;
    line-height: 1.3;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: 18px;
    line-height: 1.6;
    word-break: keep-all;
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 30px;
    }

    p {
      font-size: 15px;
    }
  }
`;

// PC에서는 두 칸, 태블릿부터 한 칸
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

// 회원정보·배송지·주문내역에서 공통 사용
export const Card = styled.section`
  min-width: 0;
  padding: 24px;

  background: ${theme.colors.white};
  border-radius: 18px;
  box-shadow: 0 2px 5px rgba(44, 62, 53, 0.1);

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

// 카드 제목과 오른쪽 버튼 배치
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  margin-bottom: 20px;
`;

export const HeadingGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  min-width: 0;

  h2 {
    font-size: 22px;
    line-height: 1.4;
  }

  p {
    margin-top: 4px;
    color: ${theme.colors.textSecondary};
    font-size: 14px;
    line-height: 1.5;
    word-break: keep-all;
  }
`;

// 제목 옆 원형 아이콘 배경
export const IconCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 48px;
  height: 48px;
  border-radius: 50%;

  background: #edf3ee;
  color: ${theme.colors.primary};

  svg {
    width: 28px;
    height: 28px;
  }
`;

// 수정·추가·삭제·상세 보기에서 재사용
export const OutlineButton = styled.button`
  flex-shrink: 0;
  min-height: 40px;
  padding: 8px 18px;

  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radius.button};

  color: ${theme.colors.primary};
  background: ${theme.colors.white};
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: #edf3ee;
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.secondary};
    outline-offset: 3px;
  }
`;

export const LogoutBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  padding: 20px 24px;
  border-radius: 18px;
  background: ${theme.colors.white};
  box-shadow: 0 2px 5px rgba(44, 62, 53, 0.1);

  h2 {
    font-size: 22px;
  }
`;

export const LogoutButton = styled.button`
  min-width: 150px;
  min-height: 44px;
  padding: 10px 24px;

  border-radius: ${theme.radius.button};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 15px;
  font-weight: 700;

  &:hover:not(:disabled) {
    background: ${theme.colors.hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.secondary};
    outline-offset: 3px;
  }
`;
