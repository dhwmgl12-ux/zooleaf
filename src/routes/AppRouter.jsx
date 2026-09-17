import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MainPage from '../pages/MainPage';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductPage = lazy(() => import('../pages/ProductPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const Discount = lazy(() => import('../pages/Discount'));
const ExperienceDetailPage = lazy(() => import('../pages/ExperienceDetailPage'));
const GoodsDetailPage = lazy(() => import('../pages/GoodsDetailPage'));
const GoodsPage = lazy(() => import('../pages/GoodsPage'));
const ExperiencePage = lazy(() => import('../pages/ExperiencePage'));
const IntroPage = lazy(() => import('../pages/Intro').then((m) => ({ default: m.IntroPage })));
const Animal = lazy(() => import('../pages/AnimalStoryPage'));
const MyPage = lazy(() => import('../pages/MyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
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
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/experiences" element={<ExperiencePage />} />
            <Route path="/experiences/:experienceId" element={<ExperienceDetailPage />} />
            <Route path="/goods" element={<GoodsPage />} />
            <Route path="/goods/:goodsId" element={<GoodsDetailPage />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/about" element={<IntroPage />} />
            <Route path="/animals" element={<Animal />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
