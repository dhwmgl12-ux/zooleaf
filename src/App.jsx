import { useAuthRestore } from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

export default function App() {

  useAuthRestore
  return (
    <>
      <AppRouter />
      <h1>안녕하세요</h1>
    </>
  );
}
