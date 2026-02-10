import { Box, Button, Center, Group, Image, Text, Title } from "@mantine/core";
import logo from "@/assets/images/logo.svg";
import { useBlockedAccount } from "./useBlockedAccount";

export default function BlockedAccount() {
  const { logoutLoading, onLogoutHandler } = useBlockedAccount();

  return (
    <Box>
      <Center>
        <Image src={logo} h={70} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} ta="center">
        Blocked Account
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Your account has been blocked. Please contact the administrator for
        assistance.
      </Text>

      <Group justify="center" align="center" mt="lg">
        <Button
          type="button"
          color="red"
          variant="outline"
          loading={logoutLoading}
          disabled={logoutLoading}
          onClick={onLogoutHandler}
        >
          Logout
        </Button>
      </Group>
    </Box>
  );
}
