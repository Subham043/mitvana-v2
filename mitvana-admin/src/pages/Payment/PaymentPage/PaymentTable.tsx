import TableRowLoading from "@/components/TableRowLoading";
import type { PaymentListType } from "@/utils/types";
import { Anchor, Avatar, Box, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo } from "react";
import { page_routes } from "@/utils/routes/page_routes";
import { Link } from "react-router";

type PaymentTableProps = {
  payments: PaymentListType[];
  loading: boolean;
};

const PaymentTableRow = memo(
  ({
    order_id,
    order,
    razorpay_order_id,
    razorpay_payment_id,
    status,
    createdAt,
  }: PaymentListType) => {
    return (
      <Table.Tr key={order_id}>
        <Table.Td>
          {order ? (
            <Anchor
              component={Link}
              to={`${page_routes.orders.link}/${order_id}`}
              underline="never"
            >
              <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize" c="dark">
                {order.orderId}
              </Text>
            </Anchor>
          ) : (
            "-"
          )}
        </Table.Td>
        <Table.Td>{razorpay_order_id}</Table.Td>
        <Table.Td>{razorpay_payment_id}</Table.Td>
        <Table.Td>₹{order ? order.total_price : "0"}</Table.Td>
        <Table.Td>{status}</Table.Td>
        <Table.Td>
          {order && order.user && (
            <Group gap={7} align="flex-start">
              <Avatar
                name={order.user.name}
                color="initials"
                alt={order.user.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {order.user.name}
                </Text>
                <Text
                  fw={500}
                  fs="italic"
                  size="xs"
                  lh={1}
                  ml={3}
                  tt="lowercase"
                  mt={5}
                >
                  {order.user.email}
                </Text>
              </Box>
            </Group>
          )}
        </Table.Td>
        <Table.Td>
          <Datetime value={createdAt} />
        </Table.Td>
      </Table.Tr>
    );
  },
);

function PaymentTable({ loading, payments }: PaymentTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>ORDER ID</Table.Th>
            <Table.Th>RAZORPAY ORDER ID</Table.Th>
            <Table.Th>RAZORPAY PAYMENT ID</Table.Th>
            <Table.Th>TOTAL PRICE</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>USER</Table.Th>
            <Table.Th>DATE</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : payments.length > 0 ? (
            payments.map((item) => (
              <PaymentTableRow key={item.order_id} {...item} />
            ))
          ) : (
            <TableRowNotFound colSpan={7} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default PaymentTable;
