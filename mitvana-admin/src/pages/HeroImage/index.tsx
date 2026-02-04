import HeroImageForm from "./HeroImageForm";
import PermittedLayout from "@/layouts/PermittedLayout";
import { type ExtendedModalProps } from "@/utils/types";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import HeroImageTable from "./HeroImagePage/HeroImageTable";
import HeroImageFilters from "./HeroImagePage/HeroImageFilters";
import { useHeroImageTable } from "./HeroImagePage/useHeroImageTable";
import { useCallback, useState } from "react";

/*
 * Hero Image Page
 */
export default function HeroImage() {
  const { data, isLoading, isFetching, isRefetching } = useHeroImageTable();

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
            <Title order={4}>Hero Images</Title>
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
          <HeroImageFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <HeroImageTable
            heroImages={data?.data ?? []}
            loading={isLoading || isFetching || isRefetching}
            onEdit={handleModalUpdate}
          />
        </Box>
        {data && data.data.length > 0 && (
          <CustomPagination totalCount={data ? data.meta.total : 0} />
        )}
      </Paper>
      <HeroImageForm modal={modal} handleModalClose={handleModalClose} />
    </>
  );
}
