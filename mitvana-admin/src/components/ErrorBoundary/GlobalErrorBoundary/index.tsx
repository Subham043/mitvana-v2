import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Fallback/ErrorFallback";

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("App crash:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
