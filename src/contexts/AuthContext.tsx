import { storageKeys } from '@/config/storageKeys';
import { AuthService } from '@/services/AuthService';
import { createContext, useCallback, useMemo, useState } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.ACCESS_TOKEN);
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({
      email,
      password
    });

    localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
    localStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);


    setSignedIn(true);
  }, []);

  const value = useMemo(() => ({
    signedIn: signedIn, signIn
  }), [signIn, signedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


