import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useToastStore from '../../store/toastStore';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (isAuthReady && !isLoggedIn) {
      showToast('로그인이 필요합니다.');
    }
  }, [isAuthReady, isLoggedIn, showToast]);

  if (!isAuthReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
