import {
  Box,
  Paper,
  SimpleGrid,
  Button,
  TextInput,
  Group,
  Title,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useProfileUpdateForm } from "./useProfileUpdateForm";
import { Controller } from "react-hook-form";

/*
 * My Account Page
 */
export default function Account() {
  const {
    form,
    onSubmit,
    loading,
    isProfileLoading,
    isProfileRefetching,
    isProfileFetching,
  } = useProfileUpdateForm();

  return (
    <Paper shadow="xs" withBorder pos="relative" mt="md">
      <LoadingOverlay
        visible={isProfileLoading || isProfileFetching || isProfileRefetching}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={onSubmit}>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Update Profile</Title>
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
              name="name"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                />
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                />
              )}
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Phone"
                  value={field.value ? field.value : ""}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </SimpleGrid>
        </Box>
      </form>
    </Paper>
  );
}
