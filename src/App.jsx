import { useAuthRestore } from "./hooks/useAuth";
import GlobalStyle from "./styles/GlobalStyle.jsx"
import AppRouter from "./routes/AppRouter";

export default function App() {

  useAuthRestore
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
}
