import { storageKeys } from '@/config/storageKeys';
import { AuthService } from '@/services/AuthService';
import { httpClient } from '@/services/httpClient';
import { createContext, useCallback, useMemo, useState } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut: VoidFunction;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    const storedAccessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);

    if (storedAccessToken) {
      httpClient.defaults.headers.authorization = `Bearer ${storedAccessToken}`;
    }

    return !!storedAccessToken;
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({
      email,
      password
    });

    localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
    localStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);

    httpClient.defaults.headers.authorization = `Bearer ${accessToken}`;

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(storageKeys.ACCESS_TOKEN);
    localStorage.removeItem(storageKeys.REFRESH_TOKEN);

    setSignedIn(false);
  }, []);

  const value = useMemo(() => ({
    signedIn: signedIn,
    signIn,
    signOut
  }), [signIn, signedIn, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


