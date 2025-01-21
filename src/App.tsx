import { AuthProvider } from './contexts/AuthContext';
import { SignIn } from './pages/SignIn';

export default function App() {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
}
