import TableRowLoading from "@/components/TableRowLoading";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { OrderListType } from "@/utils/types";
import { ActionIcon, Avatar, Box, Group, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import Datetime from "@/components/Datetime";
import { memo } from "react";
import { Link } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import OrderToggleStatusBtn from "./OrderCancelBtn";
import StatusUpdateBtn from "./StatusUpdateBtn";
import OrderPDFExportBtn from "./OrderPDFExportBtn";

type OrderTableProps = {
  orders: OrderListType[];
  loading: boolean;
};

const OrderTableRow = memo(
  ({
    id,
    orderId,
    user,
    order_items,
    total_price,
    status,
    cancellation_reason,
    createdAt,
  }: OrderListType) => {
    return (
      <Table.Tr key={id}>
        <Table.Td>{orderId}</Table.Td>
        <Table.Td>
          {user && (
            <Group gap={7} align="flex-start">
              <Avatar
                name={user.name}
                color="initials"
                alt={user.name}
                radius="xl"
                size={30}
              />
              <Box>
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                  {user.name}
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
                  {user.email}
                </Text>
              </Box>
            </Group>
          )}
        </Table.Td>
        <Table.Td>
          {order_items.map((itm) => itm.product_title).join(", ")}
        </Table.Td>
        <Table.Td>₹{total_price}</Table.Td>
        <Table.Td>
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
        <Table.Td>{cancellation_reason}</Table.Td>
        <Table.Td>
          <Datetime value={createdAt} />
        </Table.Td>
        <Table.Td>
          <PermittedLayout outletType="children" allowedRoles="Admin">
            <Group justify="end" gap="xs">
              <ActionIcon
                variant="filled"
                aria-label="View"
                component={Link}
                to={`${page_routes.orders.link}/${id}`}
              >
                <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
              </ActionIcon>
              <OrderPDFExportBtn id={id} />
              <OrderToggleStatusBtn
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
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function OrderTable({ loading, orders }: OrderTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>ID</Table.Th>
            <Table.Th>USER</Table.Th>
            <Table.Th>PRODUCTS</Table.Th>
            <Table.Th>PRICE</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>REASON</Table.Th>
            <Table.Th>DATE</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={8} />
          ) : orders.length > 0 ? (
            orders.map((item) => <OrderTableRow key={item.id} {...item} />)
          ) : (
            <TableRowNotFound colSpan={8} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default OrderTable;
