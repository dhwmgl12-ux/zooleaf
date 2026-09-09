import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/experiences" element={<ExperiencePage />} />
          <Route path="/experience/:experienceId" element={<ExperienceDetailPage />} />
          <Route path="/goods" element={<GoodsPage />} />
          <Route path="/goods/:goodsId" element={<GoodsDetailPage />} />
          <Route path="/discount" element={<Discount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
