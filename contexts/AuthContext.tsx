import { MultiFactorUser } from 'firebase/auth';
import React, { useContext, useState } from 'react'

interface AuthContextProvider {
  user: MultiFactorUser | null;
  setUser: Function;
}

const AuthContext = React.createContext<AuthContextProvider>({ user: null, setUser: () => { } });

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<MultiFactorUser | null>(null)

  const value = {
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}