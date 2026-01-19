import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { ColorType } from "@/utils/types";
import { ColorSwatch, Group, Menu, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import ColorDeleteBtn from "./ColorDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type ColorTableProps = {
  colors: ColorType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const ColorTableRow = memo(
  ({
    id,
    name,
    code,
    createdAt,
    onEdit,
  }: ColorType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td tt="capitalize">{name}</Table.Td>
        <Table.Td>
          <Group gap="xs">
            <ColorSwatch color={code} size={20} />
            <Text size="sm">{code}</Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Datetime value={createdAt} />
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
                <ColorDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function ColorTable({ loading, colors, onEdit }: ColorTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>NAME</Table.Th>
            <Table.Th>CODE</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={4} />
          ) : colors.length > 0 ? (
            colors.map((item) => (
              <ColorTableRow
                key={item.id}
                id={item.id}
                name={item.name}
                code={item.code}
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

export default ColorTable;
