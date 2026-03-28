import type { OrderInfoType } from "@/utils/types";
import { Box, Divider, Group, Paper, Table, Title } from "@mantine/core";
type Props = {
  data: OrderInfoType["order_address"];
};
function OrderAddressInfo({ data }: Props) {
  return (
    <Paper shadow="xs" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Address Information</Title>
        </Group>
      </Box>
      <Divider />
      <Box pos="relative">
        <Table horizontalSpacing="md">
          <Table.Tbody>
            <Table.Tr>
              <Table.Th c="blue">NAME</Table.Th>
              <Table.Td>
                {data?.first_name} {data?.last_name}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">PHONE</Table.Th>
              <Table.Td>{data?.phone_number}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">ALTERNATE PHONE</Table.Th>
              <Table.Td>{data?.alternate_phone}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">COMPANY</Table.Th>
              <Table.Td>{data?.company_name}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">ADDRESS</Table.Th>
              <Table.Td>{data?.address}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">ADDRESS 2</Table.Th>
              <Table.Td>{data?.address_2}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">CITY</Table.Th>
              <Table.Td>{data?.city}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">STATE</Table.Th>
              <Table.Td>{data?.state}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">POSTAL CODE</Table.Th>
              <Table.Td>{data?.postal_code}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">COUNTRY</Table.Th>
              <Table.Td>{data?.country}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">SHIPPING NOTE</Table.Th>
              <Table.Td>{data?.shipping_note}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">ALTERNATE PHONE</Table.Th>
              <Table.Td>{data?.alternate_phone}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

export default OrderAddressInfo;
