import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export const ProtectedRoute: FC = () => {
  // user, loading
  let loading = false;
  let user = true;

  if (loading) {
    return <LoadingScreen />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const PublicRoute: FC = () => {
  // user, loading
  let loading = false;
  let user = true;

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

{
  /* <ComponentePadre > ---> children
    <Hijo />
</ComponentePadre> */
}

{
  /* <RoutePadre > ---> Outlet
    <Hijo />
</RoutePadre>  */
}
