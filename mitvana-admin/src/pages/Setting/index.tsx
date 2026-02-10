import { useSettingUpdateForm } from "./useSettingUpdateForm";
import {
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller } from "react-hook-form";

export default function Setting() {
  const { form, onSubmit, loading, isLoading, isRefetching, isFetching } =
    useSettingUpdateForm();

  return (
    <Paper shadow="xs" withBorder pos="relative" mt="md">
      <LoadingOverlay
        visible={isLoading || isFetching || isRefetching}
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
              name="min_cart_value_for_free_shipping"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Min Cart Value For Free Shipping"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="admin_email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Admin Email"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="top_banner_text"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Top Banner Text"
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
