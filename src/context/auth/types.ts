import { ReactNode } from "react";

export interface AuthState {
  user: null;
  session: null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  singUp: () => void;
  signIn: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
