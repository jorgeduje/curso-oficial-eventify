import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "./routes";
import { createElement } from "react";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.public.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element && createElement(route.element)}
          />
        ))}

        {routes.protected.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element && createElement(route.element)}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
