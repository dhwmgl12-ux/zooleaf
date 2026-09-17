import { useAuthRestore } from "./hooks/useAuth";
import GlobalStyle from "./styles/GlobalStyle.jsx"
import AppRouter from "./routes/AppRouter";
import Toast from "./components/common/Toast.jsx";
import { useEffect } from "react";

function prefetchRoutes() {
  import("./pages/ProductPage");
  import("./pages/CartPage");
  import("./pages/ProductDetailPage");
  import("./pages/Discount");
  import("./pages/ExperienceDetailPage");
  import("./pages/GoodsDetailPage");
  import("./pages/GoodsPage");
  import("./pages/ExperiencePage");
  import("./pages/Intro");
  import("./pages/AnimalStoryPage");
  import("./pages/MyPage");
}

export default function App() {
  useAuthRestore();
  
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(prefetchRoutes);
      return () => cancelIdleCallback(id);
    }
    const timer = setTimeout(prefetchRoutes, 2000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      <GlobalStyle />
      <AppRouter />
      <Toast />
    </>
  );
}
