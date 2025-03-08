import { ThemeProvider } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import theme from "../styles/theme";
import { AuthProvider } from "../context/auth/AuthProvider";

interface AppProvdersProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProvdersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
