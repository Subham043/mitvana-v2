import { IconArrowLeft } from "@tabler/icons-react";
import {
  Anchor,
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
import classes from "./index.module.css";
import { Link } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import logo from "@/assets/images/logo.svg";
import { useForgotPassword } from "./useForgotPassword";
import CaptchaInput from "@/components/CaptchaInput";
import { Controller } from "react-hook-form";

export default function ForgotPassword() {
  const { form, loading, onSubmit, captchaRef } = useForgotPassword();

  return (
    <Box>
      <Center>
        <Image src={logo} h={70} w="auto" fit="contain" mb="xs" />
      </Center>
      <Title order={3} className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <form onSubmit={onSubmit}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label="Your email"
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
