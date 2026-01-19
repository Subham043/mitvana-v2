import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Drawer,
  Group,
  LoadingOverlay,
  PasswordInput,
  Switch,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useUserForm } from "./useUserForm";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * User Form Drawer
 */
export default function UserForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useUserForm({
    modal,
    closeModal: handleModalClose,
  });

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} User`}
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="md"
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={onSubmit}>
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
                data-autofocus
              />
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                placeholder="me@company.dev"
                type="email"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mt="md"
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
                withAsterisk
                mt="md"
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
                  withAsterisk={modal.type === "create"}
                  mt="md"
                />
              </PasswordStrengthChecker>
            )}
          />
          <Controller
            control={form.control}
            name="confirm_password"
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Confirm Password"
                placeholder="••••••••"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk={modal.type === "create"}
                mt="md"
              />
            )}
          />
          {modal.type === "update" && (
            <Controller
              name="is_blocked"
              control={form.control}
              render={({ field, fieldState }) => (
                <Switch
                  label="Is Blocked?"
                  checked={field.value === true ? true : false}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  mt="md"
                />
              )}
            />
          )}
          <Group gap="xs" mt="md">
            <Button
              type="submit"
              variant="filled"
              color="blue"
              disabled={loading}
              loading={loading}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="filled"
              color="red"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </Drawer>
  );
}
