import { Outlet } from "react-router";
import PageLoader from "../PageLoader";
import { Suspense, useEffect } from "react";
import { nprogress } from "@mantine/nprogress";

type Props = {
  context?: unknown;
};

function SuspenseFallback() {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.complete();
    };
  }, []);

  return <PageLoader />;
}

export default function SuspenseOutlet({ context }: Props) {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Outlet context={context} />
    </Suspense>
  );
}
