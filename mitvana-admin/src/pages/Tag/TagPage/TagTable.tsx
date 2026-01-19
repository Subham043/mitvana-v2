import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { TagType } from "@/utils/types";
import { Group, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./TagDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type TagTableProps = {
  tags: TagType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const TagTableRow = memo(
  ({
    id,
    name,
    createdAt,
    updatedAt,
    onEdit,
  }: TagType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td tt="capitalize">{name}</Table.Td>
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

function TagTable({ loading, tags, onEdit }: TagTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>NAME</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th>UPDATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={4} />
          ) : tags.length > 0 ? (
            tags.map((item) => (
              <TagTableRow
                key={item.id}
                id={item.id}
                name={item.name}
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

export default TagTable;
