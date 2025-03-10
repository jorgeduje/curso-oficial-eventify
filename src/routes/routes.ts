import { ComponentType, lazy, LazyExoticComponent } from "react";

interface AppRoute {
  path?: string;
  element?: LazyExoticComponent<ComponentType<object>> | ComponentType<object>;
}

const Calendar = lazy(() => import("../pages/calendar/Calendar"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const Dashboard = lazy(() => import("../pages/dasboard/Dashboard"));
const Settings = lazy(() => import("../pages/settings/Settings"));
export const routes: { public: AppRoute[]; protected: AppRoute[] } = {
  public: [
    { path: "/login", element: Login },
    { path: "/register", element: Register },
  ],
  protected: [
    { path: "/", element: Calendar },
    { path: "/dashboard", element: Dashboard },
    { path: "/settings", element: Settings },
  ],
};
