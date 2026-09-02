import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CartPage from "../pages/CartPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
