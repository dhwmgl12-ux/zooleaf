import styled from '@emotion/styled';
import { theme } from '../styles/variables';

export const Container = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${theme.fontSize.h3.size};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[16]};
`;

export const SubTitle = styled.p`
  font-size: ${theme.fontSize.bodylarge.size};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[32]};
`;

export const FilterBox = styled.div`
  width: 100%;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  padding: ${theme.spacing[12]} 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: ${theme.spacing[64]};
  gap: ${theme.spacing[32]};

  .divider {
    width: 1px;
    height: 56px;
    background-color: ${theme.colors.background2};
    flex-shrink: 0;
  }
  
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing[16]};
    padding: ${theme.spacing[20]} 60px;

    .divider {
      width: 100%;
      height: 1px;
    }
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${theme.spacing[20]};
    width: 100%;
  }
`;

export const TabBtn = styled.button`
  align-self: flex-end;
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

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    padding: ${theme.spacing[4]} ${theme.spacing[8]};
  }
`;

export const ZoneTabs = styled.div`
  display: flex;
  gap: ${theme.spacing[14]};
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 고정 크기 대신 유연하게 줄어들도록 추가 */

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 100%;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing[8]} ${theme.spacing[4]};
    button {
      margin-top: ${theme.spacing[10]};
      width: 100%;
      font-size: ${theme.fontSize.body.size};
      text-align: center;
      padding: ${theme.spacing[8]} 0;
    }
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 100%;
  max-width: 340px;
  text-align: left;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 100%;
    max-width: none;
    margin-left: 0;
    flex-shrink: 1;

    > div,
    button {
      width: 100%;
    }
  }
`;

export const DropdownHeader = styled.div`
  max-width: 340px;
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
  gap: ${theme.spacing[12]};
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

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    max-width: 100%;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: ${theme.colors?.white};
  border: 1px solid ${theme.colors.background2};
  border-radius: ${theme.radius.input};
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
  gap: ${theme.spacing[32]};
  margin-bottom: ${theme.spacing[40]};
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
    text-align: left;
  }
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-left: 0;
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
  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: ${theme.spacing[32]};
  gap: ${theme.spacing[24]};
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    flex-direction: column;
    align-items: stretch; /* 아이템들을 가로로 꽉 채워 유연하게 정렬 */
    padding: ${theme.spacing[16]};
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    padding: ${theme.spacing[16]};
    align-items: stretch;
  }
`;

export const AnimalImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: ${theme.radius.image};
  flex-shrink: 0;
  background-color: ${theme.colors.background2};
  opacity: ${(porps) => (porps.$loaded ? 1 : 0)};
  transition: opacity 0.25s ease;
  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    width: 116px;
    height: 116px;
    /* margin-top: ${theme.spacing[56]}; */
  }
  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: 116px;
    height: 116px;
    margin: 0 0 16px 0;
    display: block;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    width: 116px;
    height: 116px;
    margin: 0 0 12px 10px;
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
    margin-bottom: ${theme.spacing[12]};
    color: ${theme.colors.primary};
    font-weight: ${theme.fontWeight.bold};
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: ${theme.spacing[8]};

    span {
      font-size: ${theme.fontSize.body.size};
      color: ${theme.colors.textSecondary};
      font-weight: ${theme.fontWeight.regular};
    }
  }

  @media (max-width: ${theme.layout.breakpoint.tablet}) {
    margin-left: 0;
    h3 {
      font-size: ${theme.fontSize.h5.size};
      margin-bottom: ${theme.spacing[16]};
    }
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin: 0 0 12px 10px;
  }
`;

export const TmiBox = styled.div`
  background-color: ${theme.colors.background2};
  border-radius: ${theme.radius.box};
  padding: 10px 14px;
  margin-top: auto;
  margin-bottom: 0;

  .tmi-label {
    font-size: ${theme.fontSize.h5.size};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primary};
    display: block;
    margin-bottom: ${theme.spacing[8]};
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
    margin-left: 0;
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    margin: 0 4px 0 0;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing[8]};
`;

export const PageBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.active ? theme.colors.primary || '#27ae60' : '#ddd')};
  background-color: ${(props) =>
    props.active ? theme.colors.primary || '#27ae60' : '#fff'};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  font-weight: ${theme.fontWeight.semiBold};
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
      props.active ? theme.colors.primary || '#27ae60' : '#f1f2f6'};
  }
`;
