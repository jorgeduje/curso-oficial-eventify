import { AuthError, Session, User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}
export interface UserMetadata {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  [key: string]: string | number | boolean | undefined;
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
  updateUserMetadata: (metadata: UserMetadata) => Promise<{
    error: AuthError | null;
    data: { user: User } | null;
  }>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
