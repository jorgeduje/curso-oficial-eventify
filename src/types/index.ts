import { UseFormReturn } from "react-hook-form";

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
  description?: string;
  start_time: string;
  end_time: string;
  user_id?: string;
}

export interface CalendarHeaderProps {
  onNewEvent: () => void;
}

export interface EventFormValues {
  title: string;
  start: Date;
  end: Date;
  description?: string;
}
export interface EventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormValues) => Promise<void>;
  form: UseFormReturn<EventFormValues>;
  isEditing: boolean;
  loading: boolean;
  onDelete?: () => void;
}
export interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export interface EventStats {
  totalEvents: number;
  monthlyStats: { [key: string]: number };
}

export interface ChartItem {
  name: string;
  value: number;
  fill: string;
}
