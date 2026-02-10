import SuspenseOutlet from "@/components/SuspenseOutlet";
import BlockedAccount from "@/pages/Auth/BlockedAccount";
import { useAuthStore } from "@/stores/auth.store";
import { Center, Container } from "@mantine/core";
import type { FC } from "react";

const BlockedLayout: FC = () => {
  const authUser = useAuthStore((state) => state.authUser);

  return authUser && !authUser.is_blocked ? (
    <SuspenseOutlet />
  ) : (
    <Center w="100%" mih="100dvh" bg="#f1f1f1">
      <Container w={{ lg: "30dvw", md: "100%" }} my={40}>
        <BlockedAccount />
      </Container>
    </Center>
  );
};

export default BlockedLayout;
