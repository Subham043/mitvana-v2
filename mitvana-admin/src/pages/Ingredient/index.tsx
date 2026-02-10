import IngredientForm from "./IngredientForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import IngredientTable from "./IngredientPage/IngredientTable";
import IngredientFilters from "./IngredientPage/IngredientFilters";
import { useIngredientTable } from "./IngredientPage/useIngredientTable";
import { useCallback, useState } from "react";

/*
 * Ingredient Page
 */
export default function Ingredient() {
  const { data, isLoading, isFetching, isRefetching } = useIngredientTable();

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
            <Title order={4}>Ingredients</Title>
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
          <IngredientFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <IngredientTable
            ingredients={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <IngredientForm modal={modal} handleModalClose={handleModalClose} />
    </>
  );
}
