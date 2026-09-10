import { useState } from "react";
import { useLogout } from "../hooks/useAuth";
import ProfileCard from "../components/mypage/ProfileCard";
import AddressSection from "../components/mypage/AddressSection";
import OrderSection from "../components/mypage/OrderSection";
import {
  Container,
  PageHeader,
  InfoGrid,
  LogoutBox,
  LogoutButton,
} from "./Mypage.styles";

export default function Mypage() {
  const { handleLogout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 기존 로그아웃 기능 실행
  const onLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await handleLogout();
    } finally {
      setIsLoggingOut(false);
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

      {/* 위쪽: 회원정보와 배송지 */}
      <InfoGrid>
        <ProfileCard />
        <AddressSection />
      </InfoGrid>

      {/* 가운데: 주문내역 */}
      <OrderSection />

      {/* 아래쪽: 로그아웃 */}
      <LogoutBox>
        <h2>로그아웃</h2>

        <LogoutButton type="button" onClick={onLogout} disabled={isLoggingOut}>
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </LogoutButton>
      </LogoutBox>
    </Container>
  );
}
