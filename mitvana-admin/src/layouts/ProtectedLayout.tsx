import SuspenseOutlet from "@/components/SuspenseOutlet";
import { useAuthStore } from "@/stores/auth.store";
import { page_routes } from "@/utils/routes/page_routes";
import type { FC } from "react";
import { Navigate, useLocation } from "react-router";

/*
 * Layout to redirect the user to auth screen if not logged in else display dashboard or protected screen
 */
const ProtectedLayout: FC = () => {
  const location = useLocation();
  const authToken = useAuthStore((state) => state.authToken);

  return authToken ? (
    <SuspenseOutlet />
  ) : (
    <Navigate to={page_routes.login.link} state={{ from: location }} replace />
  );
};

export default ProtectedLayout;
