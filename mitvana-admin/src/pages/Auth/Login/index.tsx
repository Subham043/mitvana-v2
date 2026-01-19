import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  Image,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./index.module.css";
import { Link } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import logo from "@/assets/images/logo.svg";
import { useLogin } from "./useLogin";
import CaptchaInput from "@/components/CaptchaInput";
import { Controller } from "react-hook-form";

/*
 * Login Page
 */
export default function Login() {
  const { form, loading, onSubmit, captchaRef } = useLogin();
  return (
    <Box>
      <Center>
        <Image src={logo} h={90} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} ta="center" className={classes.title}>
        Welcome to MITVANA Portal
      </Title>

      <form onSubmit={onSubmit}>
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
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
              />
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Password"
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
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor
              component={Link}
              to={page_routes.forgot_password.link}
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            fullWidth
            mt="xl"
            radius="md"
          >
            Sign in
          </Button>
        </Paper>
      </form>
    </Box>
  );
}
