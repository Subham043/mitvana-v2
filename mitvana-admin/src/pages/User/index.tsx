import UserForm from "./UserForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import UserTable from "./UserPage/UserTable";
import UserFilters from "./UserPage/UserFilters";
import { useUserTable } from "./UserPage/useUserTable";
import { useCallback, useState } from "react";

/*
 * Users Page
 */
export default function User() {
  const { data, isLoading, isFetching, isRefetching } = useUserTable();

  const [modal, setModal] = useState<ExtendedModalProps<{ id: string }>>({
    show: false,
    type: "create",
  });

  const handleModalClose = useCallback(
    () => setModal({ show: false, type: "create" }),
    [],
  );

  const handleModalOpen = useCallback(() => {
    setModal({ show: true, type: "create" });
  }, []);

  const handleModalUpdate = useCallback((id: string) => {
    setModal({ show: true, type: "update", id });
  }, []);

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Users</Title>
            <PermittedLayout outletType="children" allowedRoles="Admin">
              <Button variant="filled" color="teal" onClick={handleModalOpen}>
                ADD
              </Button>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <UserFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <UserTable
            users={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <UserForm modal={modal} handleModalClose={handleModalClose} />
    </>
  );
}
