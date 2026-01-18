import { Box, Button, Center, Group, Image, Text, Title } from "@mantine/core";
import logo from "@/assets/images/logo.svg";
import { useVerifyAccount } from "./useVerifyAccount";

export default function VerifyAccount() {
  const {
    loading: resendLoading,
    logoutLoading,
    onResendVerificationLink,
    onLogoutHandler,
  } = useVerifyAccount();
  return (
    <Box>
      <Center>
        <Image src={logo} h={70} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} ta="center">
        Verify Your Account
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        You need to verify your account by clicking on the link sent to your
        registered email address. If you didn't receive the email, we will
        gladly send you another.
      </Text>

      <Group justify="center" align="center" mt="lg">
        <Button
          type="button"
          variant="filled"
          loading={resendLoading}
          disabled={resendLoading}
          onClick={onResendVerificationLink}
        >
          Resend Verification Email
        </Button>
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
