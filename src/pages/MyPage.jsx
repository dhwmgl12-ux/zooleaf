import { useState } from "react";
import { useLogout } from "../hooks/useAuth";
import Modal from "../components/common/Modal";
import ProfileCard from "../components/mypage/ProfileCard";
import AddressSection from "../components/mypage/AddressSection";
import OrderSection from "../components/mypage/OrderSection";
import {
  Container,
  PageHeader,
  InfoGrid,
  LogoutBox,
  LogoutButton,
  ProfileModalActions,
  ProfileCancelButton,
  ProfileSaveButton,
  LogoutMessage,
} from "./Mypage.styles";

export default function MyPage() {
  const { handleLogout } = useLogout();

  // 확인 모달과 로그아웃 처리 상태
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeLogoutModal = () => {
    if (isLoggingOut) return;
    setIsLogoutModalOpen(false);
  };

  // 모달에서 확인했을 때만 실제 로그아웃
  const confirmLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await handleLogout();
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <Container>
      <PageHeader>
        <h1>마이페이지</h1>
        <p>
          내 정보와 주문 내역을 한눈에 관리하고, 더 편리한 쇼핑을 경험하세요.
        </p>
      </PageHeader>

      <InfoGrid>
        <ProfileCard />
        <AddressSection />
      </InfoGrid>

      <OrderSection />

      <LogoutBox>
        <h2>로그아웃</h2>

        <LogoutButton
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          disabled={isLoggingOut}
        >
          로그아웃
        </LogoutButton>
      </LogoutBox>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        title="로그아웃 확인"
      >
        <LogoutMessage>정말 로그아웃하시겠습니까?</LogoutMessage>

        <ProfileModalActions>
          <ProfileCancelButton
            type="button"
            onClick={closeLogoutModal}
            disabled={isLoggingOut}
          >
            취소
          </ProfileCancelButton>

          <ProfileSaveButton
            type="button"
            onClick={confirmLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </ProfileSaveButton>
        </ProfileModalActions>
      </Modal>
    </Container>
  );
}
