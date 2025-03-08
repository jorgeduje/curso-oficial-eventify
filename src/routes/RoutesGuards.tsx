import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import { useAuth } from "../context/auth/useAuth";

export const ProtectedRoute: FC = () => {
  // user, loading

  const { user, loading } = useAuth();

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

  const { user, loading } = useAuth();
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
