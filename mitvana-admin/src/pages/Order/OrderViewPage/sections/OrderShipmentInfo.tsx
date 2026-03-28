import Datetime from "@/components/Datetime";
import type { OrderInfoType } from "@/utils/types";
import { Box, Divider, Group, Paper, Table, Title } from "@mantine/core";

type Props = {
  data: OrderInfoType["shipment"];
};

function OrderShipmentInfo({ data }: Props) {
  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Shipment Information</Title>
        </Group>
      </Box>
      <Divider />
      <Box pos="relative">
        <Table horizontalSpacing="md">
          <Table.Tbody>
            <Table.Tr>
              <Table.Th c="blue">TRACKING LINK</Table.Th>
              <Table.Td>{data?.tracking_link}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">EXPECTED DELIVERY DATE</Table.Th>
              <Table.Td>
                {data?.expected_delivery_date && (
                  <Datetime
                    format="DD MMM, YYYY"
                    value={data.expected_delivery_date}
                  />
                )}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

export default OrderShipmentInfo;
