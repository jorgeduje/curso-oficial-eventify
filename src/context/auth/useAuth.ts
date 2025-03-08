import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./types";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Debe ser usado dentro de un authProvider");
  }
  return context;
};
