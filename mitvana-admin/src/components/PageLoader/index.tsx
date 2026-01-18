import {
  Center,
  Container,
  Group,
  Image,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import logo from "@/assets/images/cropped-logo.svg";
import { useEffect } from "react";
import { nprogress } from "@mantine/nprogress";

export default function PageLoader() {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.complete();
    };
  }, []);

  return (
    <Container>
      <Center w="100%" h="100dvh">
        <Group>
          <Stack justify="center" align="center">
            <Image src={logo} h={80} w="auto" fit="contain" mb="xs" />
            <Title size="sm" mb="xs">
              Please wait while we setup the app ...
            </Title>
            <Loader color="blue" />
          </Stack>
        </Group>
      </Center>
    </Container>
  );
}
