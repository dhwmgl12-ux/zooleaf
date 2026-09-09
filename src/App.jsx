import { useAuthRestore } from "./hooks/useAuth";
import GlobalStyle from "./styles/GlobalStyle.jsx"
import AppRouter from "./routes/AppRouter";
import Toast from "./components/common/Toast.jsx";

export default function App() {
  useAuthRestore();
  
  return (
    <>
      <GlobalStyle />
      <AppRouter />
      <Toast />
    </>
  );
}
