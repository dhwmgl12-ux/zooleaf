import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { ContentContainer } from './ContentContainer.styles.js';
import { LayoutContainer } from './Layout.styles.js';
import ScrollTopButton from '../common/ScrollTopButton.jsx';
import { Suspense } from 'react';

export default function Layout() {
  const { pathname } = useLocation();
  const isMainPage = pathname === '/';
  const isAboutPage = pathname === '/about';
  const hasBreadcrumb =
    pathname.startsWith('/products') ||
    pathname.startsWith('/goods') ||
    pathname.startsWith('/animals') ||
    pathname.startsWith('/experiences') ||
    pathname.startsWith('/discount');

  return (
    <>
      <Header />

      <LayoutContainer
        $isMainPage={isMainPage}
        $isAboutPage={isAboutPage}
        $hasBreadcrumb={hasBreadcrumb}
      >
        <Suspense fallback={null}>
          {isMainPage ? (
            <Outlet />
          ) : (
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          )}
        </Suspense>
      </LayoutContainer>

      <Footer />
      <ScrollTopButton />
    </>
  );
}
