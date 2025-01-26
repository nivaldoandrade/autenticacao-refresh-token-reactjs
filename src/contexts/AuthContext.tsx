import { storageKeys } from '@/config/storageKeys';
import { AuthService } from '@/services/AuthService';
import { httpClient } from '@/services/httpClient';
import { createContext, useCallback, useLayoutEffect, useMemo, useState } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut: VoidFunction;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.ACCESS_TOKEN);
  });

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);
        const sourceUrl = config.url;

        if (accessToken && sourceUrl !== '/auth/refresh-token') {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      }
    );

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);


  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url === '/auth/refresh-token') {
          setSignedIn(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem(storageKeys.REFRESH_TOKEN);

        if (error.response?.status !== 401 || !refreshToken) {
          return Promise.reject(error);
        }

        const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshToken(refreshToken);

        localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
        localStorage.setItem(storageKeys.REFRESH_TOKEN, newRefreshToken);

        return httpClient(originalRequest);
      }
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({
      email,
      password
    });

    localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
    localStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);

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


