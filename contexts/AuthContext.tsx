import React, { useContext, useState } from 'react'

interface AuthContextProvider {
  user: Object;
  setUser: Function;
}

const AuthContext = React.createContext<AuthContextProvider>({ user: "", setUser: () => { } });

export function useAuthContext() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }: any) {
  const [user, setUser] = useState({})

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