import PermittedLayout from "@/layouts/PermittedLayout";
import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import OrderTable from "./OrderPage/OrderTable";
import OrderFilters from "./OrderPage/OrderFilters";
import { useOrderTable } from "./OrderPage/useOrderTable";
import OrderExportBtn from "./OrderPage/OrderExportBtn";

/*
 * Order Page
 */
export default function Order() {
  const { data, isLoading, isFetching, isRefetching } = useOrderTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Orders</Title>
            <PermittedLayout outletType="children" allowedRoles="Admin">
              <Group gap="xs">
                <OrderExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <OrderFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <OrderTable
            orders={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
    </>
  );
}
