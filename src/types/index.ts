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

export interface ProfileFormValues {
  full_name: string;
  phone?: string;
}

export interface CalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface EventDTO {
  id: string;
  title: string;
  desciption?: string;
  start_time: string;
  end_time: string;
  user_id?: string;
}

export interface CalendarHeaderProps {
  onNewEvent: () => void;
}
