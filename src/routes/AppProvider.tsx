import { ThemeProvider } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import theme from "../styles/theme";
import { AuthProvider } from "../context/auth/AuthProvider";
import { Toaster } from "sonner";

interface AppProvdersProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProvdersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Toaster duration={2000} richColors position="bottom-right" />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};
