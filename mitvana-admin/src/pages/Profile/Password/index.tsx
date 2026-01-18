import {
  Box,
  Paper,
  SimpleGrid,
  Button,
  PasswordInput,
  Group,
  Title,
  Divider,
} from "@mantine/core";
import { usePasswordUpdateForm } from "./usePasswordUpdateForm";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import { Controller } from "react-hook-form";

/*
 * My Password Page
 */
export default function Password() {
  const { form, onSubmit, loading } = usePasswordUpdateForm();

  return (
    <Paper shadow="xs" withBorder pos="relative" mt="md">
      <form onSubmit={onSubmit}>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Update Password</Title>
            <Button
              type="submit"
              variant="outline"
              color="blue"
              disabled={loading}
              loading={loading}
            >
              Save
            </Button>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          <SimpleGrid cols={{ base: 1, sm: 1, md: 3 }} mb="md">
            <Controller
              control={form.control}
              name="current_password"
              render={({ field, fieldState }) => (
                <PasswordInput
                  label="Current Password"
                  placeholder="••••••••"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                />
              )}
            />
            <Controller
              control={form.control}
              name="new_password"
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
              name="confirm_new_password"
              render={({ field, fieldState }) => (
                <PasswordInput
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                />
              )}
            />
          </SimpleGrid>
        </Box>
      </form>
    </Paper>
  );
}
