import { ComponentType, lazy, LazyExoticComponent } from "react";

interface AppRoute {
  path?: string;
  element?: LazyExoticComponent<ComponentType<object>> | ComponentType<object>;
}

const Home = lazy(() => import("../pages/home/Home"));

export const routes: { public: AppRoute[]; protected: AppRoute[] } = {
  public: [],
  protected: [{ path: "/", element: Home }],
};
