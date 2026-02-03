import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
// import "react-datepicker/dist/react-datepicker.css";
import "./assets/index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientOptions } from "./utils/constants/query.ts";
import { createTheme, MantineProvider } from "@mantine/core";
import { mantineThemOptions } from "./utils/constants/theme.ts";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import GlobalErrorBoundary from "./components/ErrorBoundary/GlobalErrorBoundary/index.tsx";
import QueryErrorBoundary from "./components/ErrorBoundary/QueryErrorBoundary/index.tsx";

const queryClient = new QueryClient(QueryClientOptions);

const theme = createTheme(mantineThemOptions);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <NavigationProgress />
        <QueryClientProvider client={queryClient}>
          <QueryErrorBoundary>
            <App />
          </QueryErrorBoundary>
        </QueryClientProvider>
        <Notifications />
      </MantineProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
);
