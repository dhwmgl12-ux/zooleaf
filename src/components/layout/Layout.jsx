import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx"
import { ContentContainer } from "./ContentContainer.styles.js";


export default function Layout() {
  return (
    <>
      <Header />

      <main>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </main>

      <Footer />
    </>
  )
}
