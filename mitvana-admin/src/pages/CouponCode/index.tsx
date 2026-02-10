import CouponCodeForm from "./CouponCodeForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import CouponCodeTable from "./CouponCodePage/CouponCodeTable";
import CouponCodeFilters from "./CouponCodePage/CouponCodeFilters";
import { useCouponCodeTable } from "./CouponCodePage/useCouponCodeTable";
import { useCallback, useState } from "react";

/*
 * Coupon Code Page
 */
export default function CouponCode() {
  const { data, isLoading, isFetching, isRefetching } = useCouponCodeTable();

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
            <Title order={4}>Coupon Codes</Title>
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
          <CouponCodeFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <CouponCodeTable
            couponCodes={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <CouponCodeForm modal={modal} handleModalClose={handleModalClose} />
    </>
  );
}
