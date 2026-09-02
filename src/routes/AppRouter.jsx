import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
