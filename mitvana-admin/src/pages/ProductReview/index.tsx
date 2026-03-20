import { Box, Divider, Group, Paper, Title } from "@mantine/core";
import CustomPagination from "@/components/CustomPagination";
import ProductReviewTable from "./ProductReviewPage/ProductReviewTable";
import ProductReviewFilters from "./ProductReviewPage/ProductReviewFilters";
import { useProductReviewTable } from "./ProductReviewPage/useProductReviewTable";

/*
 * Product Review Page
 */
export default function ProductReview() {
  const { data, isLoading, isFetching, isRefetching } = useProductReviewTable();

  return (
    <>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Product Reviews</Title>
          </Group>
        </Box>
        <Divider />
        <Box p="sm">
          {/* Filters */}
          <ProductReviewFilters />
        </Box>
        <Divider />
        <Box>
          {/* Table */}
          <ProductReviewTable
            productReviews={data?.data ?? []}
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
