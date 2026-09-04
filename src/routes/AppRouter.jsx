import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CartPage from '../pages/CartPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Discount from '../pages/Discount';
import Main from '../pages/Main';
import ExperienceDetailPage from '../pages/ExperienceDetailPage';
import GoodsDetailPage from '../pages/GoodsDetailPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/experience/:experienceId" element={<ExperienceDetailPage />} />
          <Route path="/goods/:goodsId" element={<GoodsDetailPage />} />
          <Route path="/discount" element={<Discount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
