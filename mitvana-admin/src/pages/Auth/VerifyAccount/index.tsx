import {
  Box,
  Button,
  Center,
  Group,
  Image,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import logo from "@/assets/images/logo.svg";
import { useVerifyAccount } from "./useVerifyAccount";
import classes from "./index.module.css";
import { Controller } from "react-hook-form";
import CaptchaInput from "@/components/CaptchaInput";

export default function VerifyAccount() {
  const {
    resendVerificationLoading,
    logoutLoading,
    form,
    verifyAccountLoading,
    captchaRef,
    onSubmit,
    onResendVerificationLink,
    onLogoutHandler,
  } = useVerifyAccount();

  return (
    <Box>
      <Center>
        <Image src={logo} h={90} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} className={classes.title} ta="center">
        Verify Your Account!
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        You need to verify your account by clicking on the link sent to your
        registered email address. If you didn't receive the email, we will
        gladly send you another.
      </Text>

      <form onSubmit={onSubmit}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <Controller
            control={form.control}
            name="verification_code"
            render={({ field, fieldState }) => (
              <TextInput
                label="Verification Code"
                placeholder="Enter verification code"
                type="number"
                data-autofocus
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mb="md"
              />
            )}
          />
          <CaptchaInput
            control={form.control}
            error={form.formState.errors.captcha?.message}
            ref={captchaRef}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Group justify="flex-start" align="center">
              <Button
                type="submit"
                loading={verifyAccountLoading}
                disabled={verifyAccountLoading}
                className={classes.control}
              >
                Verify
              </Button>
              <Button
                type="button"
                variant="outline"
                color="cyan"
                loading={resendVerificationLoading}
                disabled={resendVerificationLoading}
                onClick={onResendVerificationLink}
              >
                Resend Code
              </Button>
            </Group>
            <Button
              type="button"
              color="red"
              variant="filled"
              loading={logoutLoading}
              disabled={logoutLoading}
              onClick={onLogoutHandler}
            >
              Logout
            </Button>
          </Group>
        </Paper>
      </form>
    </Box>
  );
}
