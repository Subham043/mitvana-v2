import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { ProductReviewType } from "@/utils/types";
import { Avatar, Badge, Box, Group, Table, Text } from "@mantine/core";
import TableRowNotFound from "@/components/TableRowNotFound";
import TagDeleteBtn from "./ProductReviewDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo } from "react";
import ProductReviewToggleStatusBtn from "./ProductReviewToggleStatusBtn";

type ProductReviewTableProps = {
  productReviews: ProductReviewType[];
  loading: boolean;
};

const ProductReviewTableRow = memo(
  ({
    id,
    title,
    rating,
    comment,
    status,
    user,
    product,
    createdAt,
  }: ProductReviewType) => {
    return (
      <Table.Tr key={id}>
        <Table.Td>
          <Group gap={7} align="center">
            <Avatar
              src={product.thumbnail_link}
              alt={product.title}
              radius="xl"
              size={60}
            />
            <Box>
              <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
                {product.title}
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
                {product.sku}
              </Text>
            </Box>
          </Group>
        </Table.Td>
        <Table.Td>{rating}</Table.Td>
        <Table.Td>{title}</Table.Td>
        <Table.Td>{comment}</Table.Td>
        <Table.Td>
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
        </Table.Td>
        <Table.Td>
          <Badge
            size="sm"
            color={
              status === "approved"
                ? "green"
                : status === "rejected"
                  ? "red"
                  : "orange"
            }
          >
            {status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Datetime value={createdAt} />
        </Table.Td>
        <Table.Td>
          <PermittedLayout outletType="children" allowedRoles="Admin">
            <Group justify="end" gap="xs">
              <TrippleDotMenu width={170}>
                {status !== "approved" && (
                  <ProductReviewToggleStatusBtn id={id} status="approved" />
                )}
                {status !== "rejected" && (
                  <ProductReviewToggleStatusBtn id={id} status="rejected" />
                )}
                <TagDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function ProductReviewTable({
  loading,
  productReviews,
}: ProductReviewTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>PRODUCT</Table.Th>
            <Table.Th>RATING</Table.Th>
            <Table.Th>TITLE</Table.Th>
            <Table.Th>COMMENT</Table.Th>
            <Table.Th>USER</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={8} />
          ) : productReviews.length > 0 ? (
            productReviews.map((item) => (
              <ProductReviewTableRow
                key={item.id}
                id={item.id}
                title={item.title}
                rating={item.rating}
                comment={item.comment}
                status={item.status}
                user={item.user}
                product={item.product}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
              />
            ))
          ) : (
            <TableRowNotFound colSpan={8} />
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default ProductReviewTable;
