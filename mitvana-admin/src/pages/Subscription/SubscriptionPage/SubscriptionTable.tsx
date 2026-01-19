import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { SubscriptionType } from "@/utils/types";
import { Group, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./SubscriptionDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type SubscriptionTableProps = {
  subscriptions: SubscriptionType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const SubscriptionTableRow = memo(
  ({
    id,
    email,
    createdAt,
    updatedAt,
    onEdit,
  }: SubscriptionType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td tt="lowercase">{email}</Table.Td>
        <Table.Td>
          <Datetime value={createdAt} />
        </Table.Td>
        <Table.Td>
          <Datetime value={updatedAt} />
        </Table.Td>
        <Table.Td>
          <PermittedLayout outletType="children" allowedRoles="Admin">
            <Group justify="end" gap="xs">
              <TrippleDotMenu width={170}>
                <Menu.Item
                  leftSection={<IconEdit size={16} stroke={1.5} />}
                  onClick={onEditHandler}
                >
                  Edit
                </Menu.Item>
                <TagDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function SubscriptionTable({
  loading,
  subscriptions,
  onEdit,
}: SubscriptionTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>EMAIL</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th>UPDATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={4} />
          ) : subscriptions.length > 0 ? (
            subscriptions.map((item) => (
              <SubscriptionTableRow
                key={item.id}
                id={item.id}
                email={item.email}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={4} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default SubscriptionTable;
