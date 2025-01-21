import { createContext, useCallback } from 'react';

interface IAuthContextValue {
  signIn(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const signIn = useCallback(async (email: string, password: string) => {

    console.log({ email, password });
  }, []);

  return (
    <AuthContext.Provider value={{ signIn }}>
      {children}
    </AuthContext.Provider>
  );
}


