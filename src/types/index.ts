export interface LoginFormValues {
  email: string;
  password: string;
}
export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AppHeaderProps {
  handleDrawerToggle: () => void;
}

export interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}
