import SuspenseOutlet from "@/components/SuspenseOutlet";
import { useAuthStore } from "@/stores/auth.store";
import { page_routes } from "@/utils/routes/page_routes";
import type { FC } from "react";
import { Navigate, useLocation } from "react-router";

/*
 * Layout to redirect the user to main screen if logged in else display auth or unprotected screen
 */
const GuestLayout: FC = () => {
  const authToken = useAuthStore((state) => state.authToken);

  const location = useLocation();

  const from = location.state?.from?.pathname || page_routes.dashboard.link;

  return !authToken ? <SuspenseOutlet /> : <Navigate to={from} replace />;
};

export default GuestLayout;
