import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
