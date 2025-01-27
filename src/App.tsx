import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Router } from './Router';
import { Appbar } from './components/Appbar';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <Appbar />

      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <Toaster />
    </AuthProvider>
  );
}
