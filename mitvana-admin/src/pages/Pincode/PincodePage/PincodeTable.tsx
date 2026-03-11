import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { PincodeType } from "@/utils/types";
import { Badge, Group, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./PincodeDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import PincodeToggleStatusBtn from "./PincodeToggleStatusBtn";

type PincodeTableProps = {
  pincodes: PincodeType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const PincodeTableRow = memo(
  ({
    id,
    pincode,
    shipping_charges,
    cgst,
    sgst,
    createdAt,
    is_delivery_available,
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
        <Table.Td>{shipping_charges}</Table.Td>
        <Table.Td>{cgst}%</Table.Td>
        <Table.Td>{sgst}%</Table.Td>
        <Table.Td>
          {is_delivery_available ? (
            <Badge size="sm" color="green">
              Yes
            </Badge>
          ) : (
            <Badge size="sm" color="red">
              No
            </Badge>
          )}
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
                <PincodeToggleStatusBtn
                  id={id}
                  is_delivery_available={is_delivery_available}
                />
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
            <Table.Th>SHIPPING CHARGES</Table.Th>
            <Table.Th>CGST</Table.Th>
            <Table.Th>SGST</Table.Th>
            <Table.Th>DELIVERY AVAILABLE</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : pincodes.length > 0 ? (
            pincodes.map((item) => (
              <PincodeTableRow
                key={item.id}
                id={item.id}
                pincode={item.pincode}
                shipping_charges={item.shipping_charges}
                cgst={item.cgst}
                sgst={item.sgst}
                is_delivery_available={item.is_delivery_available}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                onEdit={onEdit}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={7} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default PincodeTable;
