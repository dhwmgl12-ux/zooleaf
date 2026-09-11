import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx"
import { ContentContainer } from "./ContentContainer.styles.js";
import { LayoutContainer } from "./Layout.styles.js";
import ScrollTopButton from "../common/ScrollTopButton.jsx";


export default function Layout() {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";
  const isAboutPage = pathname === "/about"
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const hasBreadcrumb = pathname.startsWith("/products") ||
                        pathname.startsWith("/goods") ||
                        pathname.startsWith("/animals") ||
                        pathname.startsWith("/experience");

  return (
    <>
      <Header />

      <LayoutContainer $isMainPage={isMainPage} $isAboutPage={isAboutPage} $hasBreadcrumb={hasBreadcrumb} $noBottomPadding={isAuthPage}>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </LayoutContainer>

      <Footer />
      <ScrollTopButton />
    </>
  )
}
