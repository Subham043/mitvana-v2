import PermittedLayout from "@/layouts/PermittedLayout";
import { Box, Button, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import ProductTable from "./ProductPage/ProductTable";
import ProductFilters from "./ProductPage/ProductFilters";
import { useProductTable } from "./ProductPage/useProductTable";
import { page_routes } from "@/utils/routes/page_routes";
import { Link } from "react-router";
import ProductExportBtn from "./ProductPage/ProductExportBtn";

/*
 * Product Page
 */
export default function Product() {
  const { data, isLoading, isFetching, isRefetching } = useProductTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Products</Title>
            <PermittedLayout outletType="children" allowedRoles="Admin">
              <Group gap="xs">
                <Button
                  variant="filled"
                  color="teal"
                  component={Link}
                  to={page_routes.add_product.link}
                >
                  ADD
                </Button>
                <ProductExportBtn />
              </Group>
            </PermittedLayout>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <ProductFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <ProductTable
            products={data?.data ?? []}
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
