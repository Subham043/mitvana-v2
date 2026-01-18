import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { Box, Divider, Group, Pagination, Select } from "@mantine/core";

function CustomPagination({ totalCount }: { totalCount: number }) {
  const { page, setPage, limit, setLimit } = usePaginationQueryParam();
  return (
    <>
      <Divider />
      <Box p="sm">
        <Group justify="center">
          <Select
            data={["10", "20", "30"]}
            placeholder="Items Per Page"
            w={80}
            value={limit.toString()}
            onChange={(value) => setLimit(value ? Number(value) : 10)}
          />
          <Pagination
            boundaries={2}
            total={Math.ceil(totalCount / Number(limit))}
            value={page}
            onChange={setPage}
          />
        </Group>
      </Box>
    </>
  );
}

export default CustomPagination;
