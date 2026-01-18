import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SuspenseOutlet from "@/components/SuspenseOutlet";
import { AppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router";

export default function DashboardLayout() {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: opened },
      }}
      padding="md"
      className="no-print-layout"
    >
      <Header opened={opened} toggle={toggle} />
      <Sidebar />
      <AppShell.Main bg="#f1f1f1">
        <Box pos="relative">
          <SuspenseOutlet key={location.key} />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
