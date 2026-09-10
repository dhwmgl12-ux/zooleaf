import { useLocation } from 'react-router-dom';
import zooleafLogo from '../../assets/images/zooleaf-logo-2.webp';
import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';
import {
  AccountAvatar,
  AccountCard,
  AccountDivider,
  AccountDropdown,
  AccountInfoList,
  AccountMenuTrigger,
  AccountName,
  HeaderContainer,
  HeaderInner,
  IconButton,
  IconLink,
  LoginMenuItem,
  LogoHeading,
  LogoImage,
  LogoLink,
  LogoutButton,
  MenuTriggerItem,
  MobileAccountLink,
  MobileNavAccount,
  MobileNavCloseButton,
  MobileNavDivider,
  MobileNavGreeting,
  MobileNavLink,
  MobileNavList,
  MobileNavLogoutButton,
  MobileNavPanel,
  MobileNavTop,
  NavLink,
  NavList,
  Tooltip,
  UtilsList,
} from './Header.styles.js';
import useToastStore from '../../store/toastStore.js';

export default function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [isOverHero, setIsOverHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useLogout();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOverHero(false);
      return;
    }

    const hero = document.querySelector('[data-header-hero]');

    if (!hero) {
      setIsOverHero(false);
      return;
    }

    const updateHeader = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const heroBottom = hero.getBoundingClientRect().bottom;

      setIsOverHero(heroBottom > headerHeight);
    };

    updateHeader();

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);

    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, [pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      if (menuButtonRef.current?.contains(e.target) || menuPanelRef.current?.contains(e.target)) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [isMenuOpen])

  return (
    <HeaderContainer ref={headerRef} $isOverHero={isOverHero && !isMenuOpen}>
      <HeaderInner>
        <LogoHeading>
          <LogoLink to="/">
            <LogoImage src={zooleafLogo} alt="ZOOLEAF" />
          </LogoLink>
        </LogoHeading>

        <nav>
          <NavList>
            <li>
              <NavLink to="/about">동물원 소개</NavLink>
            </li>
            <li>
              <NavLink to="/products">입장권 & 패키지</NavLink>
            </li>
            <li>
              <NavLink to="/experiences">프로그램</NavLink>
            </li>
            <li>
              <NavLink to="/animals">동물 이야기</NavLink>
            </li>
            <li>
              <NavLink to="/goods">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/community">커뮤니티</NavLink>
            </li>
          </NavList>
        </nav>

        <UtilsList>
          <li>
            <IconLink to="/cart" aria-label="장바구니">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H7.2L9.25 19.1C9.4 20.05 10.22 20.75 11.18 20.75H23.65C24.56 20.75 25.35 20.13 25.57 19.25L27.2 12.75H8.25"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 12.75C13.75 10.95 15.35 9.75 17.25 9.75C19.15 9.75 20.75 10.95 21.5 12.75"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M12.5 27C13.4665 27 14.25 26.2165 14.25 25.25C14.25 24.2835 13.4665 23.5 12.5 23.5C11.5335 23.5 10.75 24.2835 10.75 25.25C10.75 26.2165 11.5335 27 12.5 27Z"
                  fill="currentColor"
                />
                <path
                  d="M23.25 27C24.2165 27 25 26.2165 25 25.25C25 24.2835 24.2165 23.5 23.25 23.5C22.2835 23.5 21.5 24.2835 21.5 25.25C21.5 26.2165 22.2835 27 23.25 27Z"
                  fill="currentColor"
                />
              </svg>
            </IconLink>
          </li>
          {isLoggedIn ? (
            <AccountMenuTrigger tabIndex={0} onClick={(e) => e.currentTarget.blur()}>
              <IconLink
                to="/mypage"
                aria-label="마이페이지"
                onClick={(e) => e.currentTarget.blur()}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 14.5C18.3472 14.5 20.25 12.5972 20.25 10.25C20.25 7.90279 18.3472 6 16 6C13.6528 6 11.75 7.90279 11.75 10.25C11.75 12.5972 13.6528 14.5 16 14.5Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M7 25.5C7.65 20.75 11.2 18 16 18C20.8 18 24.35 20.75 25 25.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.30078 23.1992C10.9008 24.9992 13.2508 25.9992 16.0008 25.9992C18.7508 25.9992 21.1008 24.9992 22.7008 23.1992"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </IconLink>
              <AccountDropdown data-account-dropdown>
                <AccountCard>
                  <AccountAvatar>{user?.id?.[0]?.toUpperCase()}</AccountAvatar>
                  <AccountName>{user?.name}</AccountName>

                  <AccountInfoList>
                    <span>{user?.id}</span>
                    <span>{user?.phone ?? '-'}</span>
                    <span>{user?.birthDate ?? '-'}</span>
                  </AccountInfoList>

                  <AccountDivider />

                  <LogoutButton type="button" onClick={handleLogout}>
                    로그아웃
                  </LogoutButton>
                </AccountCard>
              </AccountDropdown>
            </AccountMenuTrigger>
          ) : (
            <LoginMenuItem>
              <IconLink
                to="/login"
                aria-label="로그인"
                onClick={(e) => {
                  e.currentTarget.blur();
                  showToast('로그인이 필요합니다.');
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 14.5C18.3472 14.5 20.25 12.5972 20.25 10.25C20.25 7.90279 18.3472 6 16 6C13.6528 6 11.75 7.90279 11.75 10.25C11.75 12.5972 13.6528 14.5 16 14.5Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M7 25.5C7.65 20.75 11.2 18 16 18C20.8 18 24.35 20.75 25 25.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.30078 23.1992C10.9008 24.9992 13.2508 25.9992 16.0008 25.9992C18.7508 25.9992 21.1008 24.9992 22.7008 23.1992"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
                <Tooltip data-tooltip>로그인 해주세요.</Tooltip>
              </IconLink>
            </LoginMenuItem>
          )}

          <MenuTriggerItem>
            <IconButton
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 17C0 16.7348 0.105357 16.4804 0.292893 16.2929C0.48043 16.1054 0.734784 16 1 16H21C21.2652 16 21.5196 16.1054 21.7071 16.2929C21.8946 16.4804 22 16.7348 22 17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17ZM0 9C0 8.73478 0.105357 8.48043 0.292893 8.29289C0.48043 8.10536 0.734784 8 1 8H21C21.2652 8 21.5196 8.10536 21.7071 8.29289C21.8946 8.48043 22 8.73478 22 9C22 9.26522 21.8946 9.51957 21.7071 9.70711C21.5196 9.89464 21.2652 10 21 10H1C0.734784 10 0.48043 9.89464 0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9ZM0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H21C21.2652 0 21.5196 0.105357 21.7071 0.292893C21.8946 0.48043 22 0.734784 22 1C22 1.26522 21.8946 1.51957 21.7071 1.70711C21.5196 1.89464 21.2652 2 21 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1Z"
                  fill="currentColor"
                />
              </svg>
            </IconButton>
          </MenuTriggerItem>
        </UtilsList>
      </HeaderInner>
      {isMenuOpen && (
        <MobileNavPanel ref={menuPanelRef}>
          <MobileNavTop>
            <LogoLink to="/" onClick={() => setIsMenuOpen(false)}>
              <LogoImage variant='menu' src={zooleafLogo} alt="ZOOLEAF" />
            </LogoLink>
            <MobileNavCloseButton
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </MobileNavCloseButton>
          </MobileNavTop>

          <MobileNavAccount>
            {isLoggedIn ? (
              <>
                <MobileNavGreeting>{user?.name}님, 반가워요!</MobileNavGreeting>
                <MobileAccountLink to="/mypage" onClick={() => setIsMenuOpen(false)}>
                  마이페이지
                </MobileAccountLink>
              </>
            ) : (
              <MobileAccountLink to="/login" onClick={() => setIsMenuOpen(false)}>
                로그인
              </MobileAccountLink>
            )}
          </MobileNavAccount>

          <MobileNavDivider />

          <MobileNavList>
            <li>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                동물원 소개
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/products" onClick={() => setIsMenuOpen(false)}>
                입장권 & 패키지
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/experiences" onClick={() => setIsMenuOpen(false)}>
                프로그램
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/animals" onClick={() => setIsMenuOpen(false)}>
                동물 이야기
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/goods" onClick={() => setIsMenuOpen(false)}>
                Shop
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink to="/community" onClick={() => setIsMenuOpen(false)}>
                커뮤니티
              </MobileNavLink>
            </li>
          </MobileNavList>

          <MobileNavDivider />

          <MobileNavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
            장바구니
          </MobileNavLink>

          {isLoggedIn && (
            <MobileNavLogoutButton
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              로그아웃
            </MobileNavLogoutButton>
          )}
        </MobileNavPanel>
      )}
    </HeaderContainer>
  );
}
