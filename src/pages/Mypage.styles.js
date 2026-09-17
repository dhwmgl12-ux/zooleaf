import styled from "@emotion/styled";
import { theme } from "../styles/variables";

// 페이지 전체 너비와 세로 간격
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[24]};

  width: 100%;

  color: ${theme.colors.textPrimary};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    gap: ${theme.spacing[16]};
  }
`;

// 마이페이지 제목과 안내 문구
export const PageHeader = styled.header`
  margin-bottom: ${theme.spacing[16]};

  h2 {
    margin-bottom: ${theme.spacing[14]};
    font-size: ${theme.fontSize.h3.size};
    line-height: ${theme.fontSize.h3.lineheight};
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.bodylarge.size};
    line-height: ${theme.fontSize.bodylarge.lineheight};
    word-break: keep-all;
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    h2 {
      font-size: 28px;
      line-height: 1.4;
    }

    p {
      font-size: ${theme.fontSize.body.size};
      line-height: ${theme.fontSize.body.lineheight};
    }
  }
  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    h2 {
      font-size: 24px;
    }
  }
`;

// 회원정보와 배송지 배치: PC 두 칸, 태블릿부터 한 칸
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing[24]};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// 회원정보·배송지·주문내역의 공통 카드
export const Card = styled.section`
  min-width: 0;
  padding: ${theme.spacing[24]};

  background: ${theme.colors.white};
  border-radius: ${theme.radius.box};
  box-shadow: 0 2px 5px rgba(44, 62, 53, 0.1);

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${theme.spacing[20]};
  }
  @media (max-width: 375px) {
    padding: 14px;
    border-radius: 14px;
  }
`;

// 카드 제목 영역과 버튼을 양쪽에 배치
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing[16]};

  margin-bottom: ${theme.spacing[20]};

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    gap: ${theme.spacing[12]};

    > button {
      width: 100%;
    }
  }
`;

// 아이콘과 제목·설명을 가로로 배치
export const HeadingGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing[12]};

  min-width: 0;

  p {
    margin-top: ${theme.spacing[4]};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
    word-break: keep-all;
  }
  > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  @media (max-width: 375px) {
    gap: 8px;
    p {
      font-size: 13px;
    }
  }
`;

// 제목 옆 아이콘의 원형 배경
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
  @media (max-width: 375px) {
    width: 36px;
    height: 36px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

// 수정·추가·삭제 등에 사용하는 공통 테두리 버튼
export const OutlineButton = styled.button`
  flex-shrink: 0;
  min-height: 40px;
  padding: ${theme.spacing[8]} ${theme.spacing[16]};

  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radius.button};

  color: ${theme.colors.primary};
  background: ${theme.colors.white};
  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};
  font-weight: ${theme.fontWeight.semiBold};

  &:hover {
    background: ${theme.colors.background2};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.secondary};
    outline-offset: 3px;
  }
  max-width: 100%;
  overflow-wrap: anywhere;
  @media (max-width: 375px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

// 로그아웃 제목과 버튼을 담는 영역
export const LogoutBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing[16]};

  padding: ${theme.spacing[20]} ${theme.spacing[24]};
  border-radius: ${theme.radius.box};
  background: ${theme.colors.white};
  box-shadow: 0 2px 5px rgba(44, 62, 53, 0.1);

  h2 {
    font-size: ${theme.fontSize.h5.size};
    line-height: ${theme.fontSize.h5.lineheight};
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 375px) {
    padding: 14px;
    h2 {
      font-size: 18px;
    }
    > button {
      width: 100%;
      min-width: 0;
    }
  }
`;

// 로그아웃 버튼과 처리 중 비활성화 상태
export const LogoutButton = styled.button`
  min-width: 150px;
  min-height: 44px;
  padding: ${theme.spacing[10]} ${theme.spacing[24]};

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

// 배송지 카드들을 세로로 배치
export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[16]};
`;

// 배송지 한 개를 표시하는 카드
export const AddressBox = styled.article`
  padding: ${theme.spacing[20]};

  border-radius: ${theme.radius.box};
  background: ${theme.colors.tertiary};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    padding: ${theme.spacing[16]};
  }
  @media (max-width: 375px) {
    padding: 12px;
  }
`;

// 기본 배송지 표시 배지
export const DefaultBadge = styled.span`
  display: inline-block;
  margin-bottom: ${theme.spacing[8]};
  padding: ${theme.spacing[4]} ${theme.spacing[12]};

  border-radius: ${theme.radius.input};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  font-size: ${theme.fontSize.caption.size};
  line-height: ${theme.fontSize.caption.lineheight};
  font-weight: ${theme.fontWeight.semiBold};
`;

// 배송지 이름과 수정·삭제 버튼 배치
export const AddressTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing[12]};

  margin-bottom: ${theme.spacing[12]};
`;

// 관련 버튼들을 나란히 배치
export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[8]};
  min-width: 0;
  @media (max-width: 375px) {
    width: 100%;
    > button {
      flex: 1 1 auto;
    }
  }
`;

// 수령인·연락처·주소의 항목명과 값을 정렬
export const AddressDetails = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};

  margin: 0;

  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};

  > div {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    gap: ${theme.spacing[12]};
  }

  > div > dt {
    min-width: ${theme.spacing[48]};
    color: ${theme.colors.textSecondary};
  }

  > div > dd {
    margin: 0;
    overflow-wrap: anywhere;
  }
  @media (max-width: 375px) {
    font-size: 13px;
    > div {
      gap: 8px;
    }
  }
`;

// 카드 제목과 모바일 글자 크기
export const CardTitle = styled.h2`
  font-size: ${theme.fontSize.h5.size};
  line-height: 1.4;
  font-weight: ${theme.fontWeight.bold};
  overflow-wrap: anywhere;

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    font-size: 18px;
  }
`;

// 회원정보 목록의 기본 여백 제거
export const ProfileList = styled.dl`
  margin: 0;
`;

// 회원정보 한 줄: 항목명과 값 배치
export const ProfileRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  gap: ${theme.spacing[16]};

  padding: ${theme.spacing[16]} 0;
  border-top: 1px solid ${theme.colors.border};

  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};

  > dt {
    color: ${theme.colors.textSecondary};
  }

  > dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  &:first-of-type > dd {
    font-weight: ${theme.fontWeight.bold};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    gap: ${theme.spacing[12]};
    font-size: ${theme.fontSize.bodysmall.size};
    line-height: ${theme.fontSize.bodysmall.lineheight};
  }
  @media (max-width: 375px) {
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 8px;
    font-size: 14px;
    padding: 12px 0;
  }
`;

// 회원정보 수정 모달의 입력 폼
export const ProfileEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[20]};

  white-space: normal;
`;

// 입력 항목의 라벨과 입력창을 세로로 배치
export const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
`;

// 이름·전화번호·생년월일 입력 라벨
export const ProfileLabel = styled.label`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};
  font-weight: ${theme.fontWeight.medium};
`;

// 수정 입력창과 포커스 스타일
export const ProfileInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: ${theme.spacing[48]};
  padding: ${theme.spacing[12]} ${theme.spacing[16]};

  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.input};

  background: ${theme.colors.white};
  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;

    &[aria-invalid="true"] {
      border-color: #b42318;
      outline-color: #b42318;
    }
  }
`;

// 입력값 검증 오류 안내
export const ProfileFormError = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};
  text-align: center;
`;

// 취소·저장 버튼을 같은 너비로 배치
export const ProfileModalActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing[20]};
  margin-top: ${theme.spacing[24]};

  > button {
    min-width: 0;
    width: 100%;
  }
  @media (max-width: 375px) {
    gap: 8px;
    margin-top: 16px;
  }
`;

// 수정 취소 버튼
export const ProfileCancelButton = styled.button`
  min-height: ${theme.spacing[48]};
  padding: ${theme.spacing[12]} ${theme.spacing[16]};

  border-radius: ${theme.radius.button};
  background: ${theme.colors.background2};
  color: ${theme.colors.textPrimary};

  font-size: ${theme.fontSize.button.size};
  line-height: ${theme.fontSize.button.lineheight};
  font-weight: ${theme.fontWeight.semiBold};

  &:hover {
    background: ${theme.colors.border};
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 3px;
  }
  @media (max-width: 375px) {
    padding: 10px 8px;
    font-size: 14px;
  }
`;

// 취소 버튼 스타일을 재사용하고 저장 버튼 색상 적용
export const ProfileSaveButton = styled(ProfileCancelButton)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  &:hover {
    background: ${theme.colors.hover};
  }
`;

// 배송지 이름과 주문 상품명
export const ItemTitle = styled.h3`
  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};
  font-weight: ${theme.fontWeight.bold};
  overflow-wrap: anywhere;
`;

// 등록된 배송지가 없을 때 안내
export const AddressEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[20]};

  min-height: 280px;
  padding: ${theme.spacing[40]} ${theme.spacing[16]};
  border-top: 1px solid ${theme.colors.border};

  color: ${theme.colors.textSecondary};
  text-align: center;
  word-break: keep-all;

  > p {
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
  }

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    min-height: 200px;
  }
`;

// 기본 배송지 선택 체크박스
export const DefaultAddressLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[8]};

  color: ${theme.colors.textPrimary};
  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};

  > input {
    width: ${theme.spacing[16]};
    height: ${theme.spacing[16]};
    margin: 0;
    accent-color: ${theme.colors.primary};
  }

  > input:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 3px;
  }
`;

// 로그아웃 확인 문구
export const LogoutMessage = styled.p`
  margin: 0;
  text-align: left;

  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};
`;

// 주문이 없을 때 안내
export const OrderEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[20]};

  min-height: 280px;
  padding: ${theme.spacing[40]} ${theme.spacing[16]};
  border-top: 1px solid ${theme.colors.border};

  color: ${theme.colors.textSecondary};
  text-align: center;

  > p {
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
  }
`;

// 주문 목록
export const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};
`;

// 주문 본문과 상태·버튼 영역 배치
export const OrderCard = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${theme.spacing[20]};

  padding: ${theme.spacing[16]};
  border-radius: ${theme.radius.box};
  background: ${theme.colors.background};

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
  @media (max-width: 375px) {
    padding: 12px;
    gap: 12px;
  }
`;

// 상세 모달을 여는 주문 본문
export const OrderBodyButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[16]};

  min-width: 0;
  text-align: left;
  border-radius: ${theme.radius.input};

  &:hover strong {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 3px;
  }
  @media (max-width: 375px) {
    gap: 10px;
    align-items: flex-start;
  }
`;

// 목록과 상세에서 공통 사용
export const OrderThumbnail = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: ${theme.spacing[80]};
  height: ${theme.spacing[80]};
  object-fit: cover;
  border-radius: ${theme.radius.image};
  background: ${theme.colors.background2};

  @media (max-width: ${theme.layout.breakpoint.mobile}) {
    width: ${theme.spacing[64]};
    height: ${theme.spacing[64]};
  }
  @media (max-width: 375px) {
    width: 48px;
    height: 48px;
  }
`;

export const OrderText = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  min-width: 0;
  overflow-wrap: anywhere;

  > small,
  > span {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSize.caption.size};
    line-height: ${theme.fontSize.caption.lineheight};
  }

  > strong {
    font-size: ${theme.fontSize.body.size};
    line-height: ${theme.fontSize.body.lineheight};
  }
  @media (max-width: 375px) {
    > strong {
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

export const OrderSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${theme.spacing[16]};
  min-width: 0;
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

export const OrderStatus = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.bodysmall.size};
  line-height: ${theme.fontSize.bodysmall.lineheight};

  &::before {
    content: "•";
    margin-right: ${theme.spacing[8]};
  }
`;

export const OrderActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${theme.spacing[8]};
`;

// 모달 내부 공통 간격
export const OrderModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[16]};
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: left;

  > p {
    margin: 0;
    text-align: left;
  }

  > [data-order-modal-actions] {
    margin-top: ${theme.spacing[8]};
  }
`;

export const OrderInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing[12]};

  @media (max-width: ${theme.layout.breakpoint.smallMobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const OrderInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};

  padding: ${theme.spacing[16]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};

  > span {
    color: ${theme.colors.textSecondary};
  }
`;

export const OrderProduct = styled.article`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[16]};

  padding: ${theme.spacing[16]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};

  > div {
    min-width: 0;
  }

  > div > p {
    color: ${theme.colors.textSecondary};
  }

  > div > strong {
    color: ${theme.colors.primary};
  }
  @media (max-width: 375px) {
    padding: 12px;
    gap: 10px;
    align-items: flex-start;
  }
`;

export const OrderProductTitle = styled.h3`
  font-size: ${theme.fontSize.body.size};
  line-height: ${theme.fontSize.body.lineheight};
  font-weight: ${theme.fontWeight.bold};
  overflow-wrap: anywhere;
  @media (max-width: 375px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const OrderAmountBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[12]};

  padding: ${theme.spacing[20]};
  border-radius: ${theme.radius.box};
  background: ${theme.colors.background2};
  @media (max-width: 375px) {
    padding: 12px;
  }
`;

export const OrderAmountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing[8]};
`;

export const OrderGrandTotal = styled(OrderAmountRow)`
  padding-top: ${theme.spacing[16]};
  border-top: 1px solid ${theme.colors.border};
  color: ${theme.colors.primary};
`;

// 배송 조회: 사이트의 초록색 테마 사용
export const DeliveryPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  text-align: center;

  padding: ${theme.spacing[20]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.box};
  background: ${theme.colors.background};

  > p,
  > small {
    color: ${theme.colors.textSecondary};
  }
`;

export const DeliveryTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.h6.size};
  line-height: ${theme.fontSize.h6.lineheight};
`;

export const DeliveryEvent = styled(DeliveryPanel)`
  border-left: 4px solid ${theme.colors.primary};
  background: ${theme.colors.background2};
`;

export const AddressDeleteContent = styled.div`
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: left;

  > p {
    margin: 0;
    line-height: 1.6;
  }
`;

export const AddressDeleteNotice = styled.div`
  margin-top: ${theme.spacing[16]};
  padding: ${theme.spacing[16]};
  border-radius: 12px;
  background: ${theme.colors.background2};

  font-size: ${theme.fontSize.caption.size};
  line-height: 1.6;
  color: ${theme.colors.textSecondary};

  > strong {
    display: block;
    margin-bottom: ${theme.spacing[8]};
    color: ${theme.colors.textPrimary};
  }

  > p {
    margin: 0;
  }
`;
