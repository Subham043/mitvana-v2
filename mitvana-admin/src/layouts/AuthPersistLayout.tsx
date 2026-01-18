import PageLoader from "@/components/PageLoader";
import SuspenseOutlet from "@/components/SuspenseOutlet";
import { useAuthStore } from "@/stores/auth.store";
import { useCallback, useLayoutEffect, useState, type FC } from "react";

/*
 * Layout to redirect the user to main screen if logged in else display auth or unprotected screen
 */
const AuthPersistLayout: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const checkUserPersist = useAuthStore((state) => state.checkUserPersist);

  /*
   * Function for checking if auth cookie is valid
   */
  const checkUserCookie: () => Promise<void> = useCallback(async () => {
    try {
      await checkUserPersist();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //   removeAuthUser();
    } finally {
      setLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMounted ? checkUserCookie() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, [checkUserCookie]);

  return <>{loading ? <PageLoader /> : <SuspenseOutlet />}</>;
};

export default AuthPersistLayout;
