import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { CouponCodeType } from "@/utils/types";
import { Group, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./CouponCodeDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type CouponCodeTableProps = {
  couponCodes: CouponCodeType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const CouponCodeTableRow = memo(
  ({
    id,
    code,
    discount_percentage,
    maximum_redemptions,
    expiration_date,
    min_cart_value,
    createdAt,
    onEdit,
  }: CouponCodeType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>{code}</Table.Td>
        <Table.Td>{discount_percentage}</Table.Td>
        <Table.Td>{maximum_redemptions}</Table.Td>
        <Table.Td>
          <Datetime value={expiration_date} format="DD MMM, YYYY" />
        </Table.Td>
        <Table.Td>{min_cart_value}</Table.Td>
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

function CouponCodeTable({
  loading,
  couponCodes,
  onEdit,
}: CouponCodeTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>CODE</Table.Th>
            <Table.Th>DISCOUNT PERCENTAGE</Table.Th>
            <Table.Th>MAXIMUM REDEMPTIONS</Table.Th>
            <Table.Th>EXPIRATION DATE</Table.Th>
            <Table.Th>MIN CART VALUE</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : couponCodes.length > 0 ? (
            couponCodes.map((item) => (
              <CouponCodeTableRow
                key={item.id}
                id={item.id}
                code={item.code}
                discount_percentage={item.discount_percentage}
                maximum_redemptions={item.maximum_redemptions}
                expiration_date={item.expiration_date}
                min_cart_value={item.min_cart_value}
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

export default CouponCodeTable;
