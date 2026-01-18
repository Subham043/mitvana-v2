import { Outlet } from "react-router";
import PageLoader from "../PageLoader";
import { Suspense } from "react";

type Props = {
  context?: unknown;
};

export default function SuspenseOutlet({ context }: Props) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet context={context} />
    </Suspense>
  );
}
