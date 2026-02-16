import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { OfferType } from "@/utils/types";
import { Group, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./OfferDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";

type OfferTableProps = {
  offers: OfferType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const OfferTableRow = memo(
  ({
    id,
    title,
    discount_percentage,
    max_discount,
    products,
    min_cart_value,
    createdAt,
    onEdit,
  }: OfferType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>{title}</Table.Td>
        <Table.Td>
          {products.map((product) => product.product.title).join(", ")}
        </Table.Td>
        <Table.Td>{discount_percentage}</Table.Td>
        <Table.Td>{min_cart_value}</Table.Td>
        <Table.Td>{max_discount}</Table.Td>
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

function OfferTable({ loading, offers, onEdit }: OfferTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>TITLE</Table.Th>
            <Table.Th>APPLICABLE PRODUCTS</Table.Th>
            <Table.Th>DISCOUNT PERCENTAGE</Table.Th>
            <Table.Th>MIN CART VALUE</Table.Th>
            <Table.Th>MAXIMUM DISCOUNT</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : offers.length > 0 ? (
            offers.map((item) => (
              <OfferTableRow
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                discount_percentage={item.discount_percentage}
                max_discount={item.max_discount}
                min_cart_value={item.min_cart_value}
                products={item.products}
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

export default OfferTable;
