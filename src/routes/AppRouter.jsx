import { BrowserRouter, Routes, Route /*Navigate*/ } from 'react-router-dom'; // 배포 전 주석 해제
import Layout from '../components/layout/Layout';
// import useAuthStore from '../store/authStore'; //배포 전 주석 해제
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CartPage from '../pages/CartPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Discount from '../pages/Discount';
import MainPage from '../pages/MainPage';
import ExperienceDetailPage from '../pages/ExperienceDetailPage';
import GoodsDetailPage from '../pages/GoodsDetailPage';
import { IntroPage } from '../pages/Intro';
import AuthTest from '../components/auth/AuthTest';
import Animal from '../pages/AnimalStory';

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }; // 배포 전 주석 해제

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/authTest" element={<AuthTest />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route
            path="/experience/:experienceId"
            element={<ExperienceDetailPage />}
          />
          <Route path="/goods/:goodsId" element={<GoodsDetailPage />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/About" element={<IntroPage />} />
          <Route path="/animals" element={<Animal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
