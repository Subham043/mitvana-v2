import { IconArrowLeft } from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./index.module.css";
import { Link, useNavigate, useParams } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import logo from "@/assets/images/logo.svg";
import { useResetPassword } from "./useResetPassword";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { Controller } from "react-hook-form";
import CaptchaInput from "@/components/CaptchaInput";

export default function ResetPassword() {
  const { toastError } = useToast();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const { form, loading, onSubmit, captchaRef } = useResetPassword({
    token: token ? token : "",
  });

  useEffect(() => {
    if (!token) {
      toastError("Invalid request.");
      navigate(page_routes.login.link, { replace: true });
    }
  }, [token]);

  return (
    <Box>
      <Center>
        <Image src={logo} h={70} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} className={classes.title} ta="center">
        Reset your password!
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        You are accessing a secure environment. Please update your password.
      </Text>

      <form onSubmit={onSubmit}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                placeholder="me@company.dev"
                type="email"
                data-autofocus
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mb="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <PasswordStrengthChecker value={field.value ?? ""}>
                <PasswordInput
                  {...field}
                  label="Password"
                  placeholder="Enter password"
                  error={fieldState.error?.message}
                  withAsterisk
                />
              </PasswordStrengthChecker>
            )}
          />
          <Controller
            control={form.control}
            name="password_confirmation"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Confirm Password"
                placeholder="••••••••"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mt="md"
              />
            )}
          />
          <CaptchaInput
            control={form.control}
            error={form.formState.errors.captcha?.message}
            ref={captchaRef}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor
              c="dimmed"
              size="sm"
              component={Link}
              to={page_routes.login.link}
              className={classes.control}
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className={classes.control}
            >
              Reset password
            </Button>
          </Group>
        </Paper>
      </form>
    </Box>
  );
}
