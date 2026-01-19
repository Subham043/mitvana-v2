import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { PincodeType } from "@/utils/types";
import { Group, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./PincodeDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type PincodeTableProps = {
  pincodes: PincodeType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const PincodeTableRow = memo(
  ({
    id,
    pincode,
    service,
    tat,
    createdAt,
    onEdit,
  }: PincodeType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>{pincode}</Table.Td>
        <Table.Td>{service}</Table.Td>
        <Table.Td>{tat}</Table.Td>
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
                <TagDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function PincodeTable({ loading, pincodes, onEdit }: PincodeTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PINCODE</Table.Th>
            <Table.Th>SERVICE</Table.Th>
            <Table.Th>TAT</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={5} />
          ) : pincodes.length > 0 ? (
            pincodes.map((item) => (
              <PincodeTableRow
                key={item.id}
                id={item.id}
                pincode={item.pincode}
                service={item.service}
                tat={item.tat}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={5} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default PincodeTable;
