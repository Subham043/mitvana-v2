import CategoryForm from "./CategoryForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import CategoryTable from "./CategoryPage/CategoryTable";
import CategoryFilters from "./CategoryPage/CategoryFilters";
import { useCategoryTable } from "./CategoryPage/useCategoryTable";
import { useCallback, useState } from "react";

/*
 * Category Page
 */
export default function Category() {
  const { data, isLoading, isFetching, isRefetching } = useCategoryTable();

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
            <Title order={4}>Categories</Title>
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
          <CategoryFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <CategoryTable
            categories={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <CategoryForm modal={modal} handleModalClose={handleModalClose} />
    </>
  );
}
