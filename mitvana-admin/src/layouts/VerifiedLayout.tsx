import SuspenseOutlet from "@/components/SuspenseOutlet";
import VerifyAccount from "@/pages/Auth/VerifyAccount";
import { useAuthStore } from "@/stores/auth.store";
import { Center, Container } from "@mantine/core";
import type { FC } from "react";

const VerifiedLayout: FC = () => {
  const authUser = useAuthStore((state) => state.authUser);

  return authUser && authUser.is_verified ? (
    <SuspenseOutlet />
  ) : (
    <Center w="100%" mih="100dvh" bg="#f1f1f1">
      <Container w={{ lg: "30dvw", md: "100%" }} my={40}>
        <VerifyAccount />
      </Container>
    </Center>
  );
};

export default VerifiedLayout;
