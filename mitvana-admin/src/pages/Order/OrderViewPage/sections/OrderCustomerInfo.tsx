import type { OrderInfoType } from "@/utils/types";
import { Box, Divider, Group, Paper, Table, Title } from "@mantine/core";
type Props = {
  data: OrderInfoType["user"];
};
function OrderCustomerInfo({ data }: Props) {
  if (!data) {
    return null;
  }
  return (
    <Paper shadow="xs" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Customer Information</Title>
        </Group>
      </Box>
      <Divider />
      <Box pos="relative">
        <Table horizontalSpacing="md">
          <Table.Tbody>
            {data.name && (
              <Table.Tr>
                <Table.Th c="blue">NAME</Table.Th>
                <Table.Td>{data.name}</Table.Td>
              </Table.Tr>
            )}
            {data.email && (
              <Table.Tr>
                <Table.Th c="blue">EMAIL</Table.Th>
                <Table.Td>{data.email}</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

export default OrderCustomerInfo;
