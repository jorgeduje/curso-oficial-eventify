import { AuthError, Session, User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;

  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
