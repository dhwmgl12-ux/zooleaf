import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useAuthStore from '../store/authStore';
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CartPage from '../pages/CartPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Discount from '../pages/Discount';
import MainPage from '../pages/MainPage';
import ExperienceDetailPage from '../pages/ExperienceDetailPage';
import GoodsDetailPage from '../pages/GoodsDetailPage';
import GoodsPage from '../pages/GoodsPage';
import ExperiencePage from '../pages/ExperiencePage';
import { IntroPage } from '../pages/Intro';
import AuthTest from '../components/auth/AuthTest';
import Animal from '../pages/AnimalStory';
import MyPage from '../pages/MyPage';
import NotFoundPage from '../pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/authTest" element={<AuthTest />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/experiences" element={<ExperiencePage />} />
          <Route
            path="/experience/:experienceId"
            element={<ExperienceDetailPage />}
          />
          <Route path="/goods" element={<GoodsPage />} />
          <Route path="/goods/:goodsId" element={<GoodsDetailPage />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/About" element={<IntroPage />} />
          <Route path="/animals" element={<Animal />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
