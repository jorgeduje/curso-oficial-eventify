import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "./routes";
import { createElement, Suspense } from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import { ProtectedRoute, PublicRoute } from "./RoutesGuards";
import { Layout } from "../layouts/Layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<PublicRoute />}>
            {routes.public.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element && createElement(route.element)}
              />
            ))}
          </Route>

          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              {routes.protected.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element && createElement(route.element)}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
