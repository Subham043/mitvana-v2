import PermittedLayout from "@/layouts/PermittedLayout";
import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import PaymentTable from "./PaymentPage/PaymentTable";
import PaymentFilters from "./PaymentPage/PaymentFilters";
import { usePaymentTable } from "./PaymentPage/usePaymentTable";
import PaymentExportBtn from "./PaymentPage/PaymentExportBtn";

/*
 * Payment Page
 */
export default function Payment() {
  const { data, isLoading, isFetching, isRefetching } = usePaymentTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Payments</Title>
            <PermittedLayout outletType="children" allowedRoles="Admin">
              <Group gap="xs">
                <PaymentExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <PaymentFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <PaymentTable
            payments={data?.data ?? []}
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
