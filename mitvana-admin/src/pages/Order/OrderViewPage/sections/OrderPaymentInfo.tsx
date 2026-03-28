import type { OrderInfoType } from "@/utils/types";
import { Box, Divider, Group, Paper, Table, Title } from "@mantine/core";

type Props = {
  data: OrderInfoType["razorpay_payment"];
};
function OrderPaymentInfo({ data }: Props) {
  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Payment Information</Title>
        </Group>
      </Box>
      <Divider />
      <Box pos="relative">
        <Table horizontalSpacing="md">
          <Table.Tbody>
            <Table.Tr>
              <Table.Th c="blue">RAZORPAY ORDER ID</Table.Th>
              <Table.Td>{data?.razorpay_order_id}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">RAZORPAY PAYMENT ID</Table.Th>
              <Table.Td>{data?.razorpay_payment_id}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">STATUS</Table.Th>
              <Table.Td>{data?.status}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

export default OrderPaymentInfo;
