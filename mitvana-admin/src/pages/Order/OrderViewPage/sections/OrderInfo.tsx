import Datetime from "@/components/Datetime";
import type { OrderInfoType } from "@/utils/types";
import { Badge, Box, Divider, Group, Paper, Table, Title } from "@mantine/core";
import StatusUpdateBtn from "../../OrderPage/StatusUpdateBtn";

type Props = {
  id: OrderInfoType["id"];
  orderId: OrderInfoType["orderId"];
  status: OrderInfoType["status"];
  cancellation_reason: OrderInfoType["cancellation_reason"];
  is_igst_applicable: OrderInfoType["is_igst_applicable"];
  tax: OrderInfoType["tax"];
  total_price: OrderInfoType["total_price"];
  discounted_price: OrderInfoType["discounted_price"];
  payment_method: OrderInfoType["payment_method"];
  is_paid: OrderInfoType["is_paid"];
  paid_at: OrderInfoType["paid_at"];
  is_delivered: OrderInfoType["is_delivered"];
  delivered_at: OrderInfoType["delivered_at"];
  createdAt: OrderInfoType["createdAt"];
};
function OrderInfo({
  id,
  orderId,
  status,
  cancellation_reason,
  is_igst_applicable,
  tax,
  total_price,
  discounted_price,
  payment_method,
  is_paid,
  paid_at,
  is_delivered,
  delivered_at,
  createdAt,
}: Props) {
  return (
    <Paper shadow="xs" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Order Summary</Title>
        </Group>
      </Box>
      <Divider />
      <Box pos="relative">
        <Table horizontalSpacing="md">
          <Table.Tbody>
            {id && (
              <Table.Tr>
                <Table.Th c="blue">ID</Table.Th>
                <Table.Td>{id}</Table.Td>
              </Table.Tr>
            )}
            {orderId && (
              <Table.Tr>
                <Table.Th c="blue">ORDER ID</Table.Th>
                <Table.Td>{orderId}</Table.Td>
              </Table.Tr>
            )}
            {status && (
              <Table.Tr>
                <Table.Th c="blue">STATUS</Table.Th>
                <Table.Td ta="left">
                  <StatusUpdateBtn
                    id={id}
                    status={
                      status as
                        | "Order Placed"
                        | "Order Created"
                        | "Payment Failed"
                        | "On Hold"
                        | "Processing"
                        | "Dispatched"
                        | "In Transit"
                        | "Out for Delivery"
                        | "Delivered"
                        | "Cancelled by Admin"
                        | "Cancelled By user"
                        | "Refunded"
                        | "Failed"
                    }
                  />
                </Table.Td>
              </Table.Tr>
            )}
            {cancellation_reason && (
              <Table.Tr>
                <Table.Th c="blue">CANCELLATION REASON</Table.Th>
                <Table.Td>{cancellation_reason}</Table.Td>
              </Table.Tr>
            )}
            {is_igst_applicable && (
              <Table.Tr>
                <Table.Th c="blue">IS IGST APPLICABLE</Table.Th>
                <Table.Td>{is_igst_applicable}</Table.Td>
              </Table.Tr>
            )}
            <Table.Tr>
              <Table.Th c="blue">TAX</Table.Th>
              <Table.Td>₹{tax}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">TOTAL PRICE</Table.Th>
              <Table.Td>₹{total_price}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th c="blue">DISCOUNTED PRICE</Table.Th>
              <Table.Td>₹{discounted_price}</Table.Td>
            </Table.Tr>
            {payment_method && (
              <Table.Tr>
                <Table.Th c="blue">PAYMENT METHOD</Table.Th>
                <Table.Td>{payment_method}</Table.Td>
              </Table.Tr>
            )}
            {is_paid && (
              <Table.Tr>
                <Table.Th c="blue">IS PAID?</Table.Th>
                <Table.Td>
                  {is_paid ? (
                    <Badge size="sm" color="green">
                      Yes
                    </Badge>
                  ) : (
                    <Badge size="sm" color="red">
                      No
                    </Badge>
                  )}
                </Table.Td>
              </Table.Tr>
            )}
            {paid_at && (
              <Table.Tr>
                <Table.Th c="blue">PAID AT</Table.Th>
                <Table.Td>
                  <Datetime value={paid_at} />
                </Table.Td>
              </Table.Tr>
            )}
            {is_delivered && (
              <Table.Tr>
                <Table.Th c="blue">IS DELIVERED?</Table.Th>
                <Table.Td>
                  {is_delivered ? (
                    <Badge size="sm" color="green">
                      Yes
                    </Badge>
                  ) : (
                    <Badge size="sm" color="red">
                      No
                    </Badge>
                  )}
                </Table.Td>
              </Table.Tr>
            )}
            {delivered_at && (
              <Table.Tr>
                <Table.Th c="blue">DELIVERED AT</Table.Th>
                <Table.Td>
                  <Datetime value={delivered_at} />
                </Table.Td>
              </Table.Tr>
            )}
            {createdAt && (
              <Table.Tr>
                <Table.Th c="blue">ORDERED ON</Table.Th>
                <Table.Td>
                  <Datetime value={createdAt} />
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

export default OrderInfo;
