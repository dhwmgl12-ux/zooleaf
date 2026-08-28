import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import ProductPage from '../pages/ProductPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/Signup' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}