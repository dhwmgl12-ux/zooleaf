import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx"
import { ContentContainer } from "./ContentContainer.styles.js";
import { MainContainer } from "./Layout.styles.js";


export default function Layout() {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";

  return (
    <>
      <Header />

      <MainContainer $isMainPage={isMainPage}>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContainer>

      <Footer />
    </>
  )
}
