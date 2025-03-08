import { FC, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthProviderProps, AuthState } from "./types";

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  const signUp = () => {};
  const signIn = () => {};

  const value = { ...authState, signUp, signIn };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
