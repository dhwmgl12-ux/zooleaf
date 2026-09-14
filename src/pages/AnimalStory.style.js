import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const Container = styled.div`
  margin: 0 auto;
  padding: ${theme.spacing[4]};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${theme.fontSize.h3.size};
  color: ${theme.colors?.textPrimary};
  margin-bottom: ${theme.spacing[16]};
  margin-top: ${theme.spacing[100]};
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin-top: ${theme.spacing[56]};
  }
`;

export const SubTitle = styled.p`
  font-size: ${theme.fontSize.bodylarge.size};
  color: ${theme.colors?.textPrimary};
  margin-bottom: ${theme.spacing[80]};
`;

export const FilterBox = styled.div`
  width: 100%; /* 고정 px 제거 후 컨테이너에 맞춤 */
  background: ${theme.colors?.white || '#ffffff'};
  border-radius: ${theme.radius.box};
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: ${theme.spacing[64]};
  gap: ${theme.spacing[100]};

  .divider {
    width: 1px;
    height: 56px;
    background-color: ${theme.colors.background2};
    flex-shrink: 0;
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    flex-direction: row; /* 태블릿에서도 가로 배치 유지 */
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    gap: 12px;

    .divider {
      display: block; /* 태블릿에서는 구분선 유지 */
    }
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing[16]};
    padding: ${theme.spacing[20]};

    .divider {
      width: 100%;
      height: 1px; /* 모바일에서는 세로선이 아니라 가로 구분선으로 변경 */
    }
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 100%;
    height: 200px;
  }
`;

export const TabBtn = styled.button`
  padding: 8px 12px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.textPrimary};
  font-weight: ${theme.fontWeight.semiBold};
  font-size: ${theme.fontSize.h5.size};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
    background-color: transparent;
  }
`;

export const ZoneTabs = styled.div`
  display: flex;
  gap: ${theme.spacing[24]};
  align-items: center;
  justify-content: space-between;
  max-width: 650;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 100%;
    justify-content: flex-start;
    gap: ${theme.spacing[24]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 4px;
    width: 100%;

    button {
      margin-top: ${theme.spacing[10]};
      width: 100%;
      text-align: left;
      padding: ${theme.spacing[8]} 0;
      font-size: ${theme.fontSize.label.size};
    }
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  flex: 1;
  max-width: 340px;
  text-align: left;
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 100%;
    max-width: none; /* PC용 최대 너비 제한 해제 */
    flex: none; /* flex 속성 초기화 */

    > div,
    button {
      width: 100%;
    }
  }
`;

export const DropdownHeader = styled.div`
  padding: 8px 16px;
  border-radius: ${theme.radius.button};
  border: 1px solid ${theme.colors.background2};
  background-color: transparent;
  color: ${theme.colors.textPrimary};
  font-size: ${theme.fontSize.buttonlarge.size};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.background2};
    border-color: transparent;
  }

  svg {
    transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: ${theme.colors?.white || '#fff'};
  border: 1px solid ${theme.colors.background2};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 10;
  overflow: hidden;
`;

export const DropdownItem = styled.li`
  padding: 8px 16px;
  font-size: ${theme.fontSize.bodylarge.size};
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.background2};
    color: ${theme.colors.textPrimary};
  }
`;

export const AnimalGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  align-items: stretch;
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    display: flex;
    flex-direction: column;
  }
`;

export const InfoRow = styled.div`
  font-size: ${theme.fontSize.body.size};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[8]};
  display: flex;
  gap: ${theme.spacing[8]};
  word-break: keep-all;
  overflow-wrap: break-word;

  strong {
    font-size: ${theme.fontSize.h5.size};
    color: ${theme.colors.primary};
    flex-shrink: 0;
    font-weight: ${theme.fontWeight.bold};
  }

  span {
    font-size: ${theme.fontSize.body.size};
    color: ${theme.colors.textPrimary};
    white-space: pre-line;
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-left: ${theme.spacing[20]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin-left: 0;
    strong {
      font-size: ${theme.fontSize.h6.size};
    }
  }
`;

export const AnimalCard = styled.div`
  width: 100%;
  background: ${theme.colors?.white || '#fff'};
  border-radius: ${theme.radius.box};
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  padding: 30px;
  gap: 24px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%; /* [수정] 카드 높이를 그리드 행에 꽉 채움 */
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding: 20px;
    gap: 16px;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: left;
    padding: ${theme.spacing[16]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    padding: 12px;
    align-items: center;
  }
`;

export const AnimalImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: ${theme.spacing[20]};
  border-radius: ${theme.radius.image};
  flex-shrink: 0;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 116px;
    height: 116px;
    margin-top: 50px;
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 116px;
    height: 116px;
    margin-top: 0;
    margin-bottom: ${theme.spacing[4]};
    display: block;
    margin-left: ${theme.spacing[20]};
    margin-right: ${theme.spacing[200]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 116px;
    height: 116px;
    margin-left: ${theme.spacing[20]};
    margin-right: ${theme.spacing[200]};
  }
`;

export const AnimalInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;

  h3 {
    font-size: ${theme.fontSize.h4.size};
    margin-top: 0;
    margin-bottom: 12px;
    color: ${theme.colors.primary};
    font-weight: ${theme.fontWeight.bold};
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;

    span {
      font-size: ${theme.fontSize.body.size};
      color: ${theme.colors.textSecondary};
      font-weight: ${theme.fontWeight.regular};
    }

    @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-left:${theme.spacing[20]};
    h3 {
      font-size: ${theme.fontSize.h5.size}
      margin-bottom: ${theme.spacing[16]}
    }
  }
    @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin-left: 0;
  }
`;

export const TmiBox = styled.div`
  background-color: ${theme.colors?.backgroundSub || '#f4f6f5'};
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: auto; /* [수정] 위쪽 남은 공간을 자동으로 채워 TMI 박스를 항상 카드 하단에 고정 */
  margin-bottom: 0;

  .tmi-label {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primary};
    display: block;
    margin-bottom: 4px;
  }

  .tmi-text {
    font-size: ${theme.fontSize.body.size};
    color: ${theme.colors.textPrimary};
    white-space: pre-line;
    margin: 0;
    line-height: 1.4;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-left: ${theme.spacing[20]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin-left: 0;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const PageBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.active ? theme.colors?.primary || '#27ae60' : '#ddd')};
  background-color: ${(props) =>
    props.active ? theme.colors?.primary || '#27ae60' : '#fff'};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.active ? theme.colors?.primary || '#27ae60' : '#f1f2f6'};
  }
`;
