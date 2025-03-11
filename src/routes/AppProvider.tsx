import { ThemeProvider } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import theme from "../styles/theme";
import { AuthProvider } from "../context/auth/AuthProvider";
import { Toaster } from "sonner";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
interface AppProvdersProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProvdersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <Toaster duration={2000} richColors position="bottom-right" />
          {children}
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
