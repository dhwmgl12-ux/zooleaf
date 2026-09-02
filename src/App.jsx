import { useAuthRestore } from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

export default function App() {

  useAuthRestore
  return (
    <>
      <AppRouter />
    </>
  );
}
