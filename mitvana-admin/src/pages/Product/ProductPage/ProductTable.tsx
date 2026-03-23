import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { ProductListType } from "@/utils/types";
import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Group,
  Menu,
  Table,
  Text,
} from "@mantine/core";
import { IconCopy, IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import ProductDeleteBtn from "./ProductDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo } from "react";
import { PhotoView, PhotoProvider } from "react-photo-view";
import { Link } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import ProductToggleStatusBtn from "./ProductToggleStatusBtn";
import { env } from "@/config/env";
import { noImage } from "@/utils/constants/variable";

type ProductTableProps = {
  products: ProductListType[];
  loading: boolean;
};

const ProductTableRow = memo(
  ({
    id,
    title,
    slug,
    hsn,
    thumbnail_link,
    is_draft,
    stock,
    price,
    discounted_price,
    categories,
    createdAt,
  }: ProductListType) => {
    return (
      <Table.Tr key={id}>
        <Table.Td>
          <Group gap={7} align="center">
            <PhotoView src={thumbnail_link ? thumbnail_link : noImage}>
              <Avatar
                src={thumbnail_link ? thumbnail_link : noImage}
                alt={title}
                radius="xl"
                size={60}
                style={{ cursor: "pointer" }}
              />
            </PhotoView>
            <Box>
              <Anchor
                href={`${env.APP_ENDPOINT}/product/${slug}`}
                target="_blank"
                underline="never"
              >
                <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize" c="dark">
                  {title}
                </Text>
              </Anchor>
              {hsn && (
                <Text
                  fw={500}
                  fs="italic"
                  size="xs"
                  lh={1}
                  ml={3}
                  tt="lowercase"
                  mt={5}
                >
                  {hsn}
                </Text>
              )}
            </Box>
          </Group>
        </Table.Td>
        <Table.Td>{categories.map((itm) => itm.name).join(", ")}</Table.Td>
        <Table.Td>{stock}</Table.Td>
        <Table.Td>{price}</Table.Td>
        <Table.Td>{discounted_price}</Table.Td>
        <Table.Td>
          {!is_draft ? (
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
                  component={Link}
                  to={`${page_routes.edit_product.link}${id}`}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconCopy size={16} stroke={1.5} />}
                  component={Link}
                  to={`${page_routes.clone_product.link}${id}`}
                >
                  Clone
                </Menu.Item>
                <ProductToggleStatusBtn id={id} is_draft={is_draft} />
                <ProductDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function ProductTable({ loading, products }: ProductTableProps) {
  return (
    <PhotoProvider maskOpacity={0.5}>
      <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
        <Table highlightOnHover horizontalSpacing="md">
          <Table.Thead>
            <Table.Tr bg={"var(--mantine-color-blue-light)"}>
              <Table.Th>PRODUCT</Table.Th>
              <Table.Th>CATEGORIES</Table.Th>
              <Table.Th>STOCK</Table.Th>
              <Table.Th>PRICE</Table.Th>
              <Table.Th>DICOUNTED PRICE</Table.Th>
              <Table.Th>PUBLISHED</Table.Th>
              <Table.Th>CREATED AT</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <TableRowLoading colSpan={8} />
            ) : products.length > 0 ? (
              products.map((item) => (
                <ProductTableRow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  sub_title={item.sub_title}
                  slug={item.slug}
                  stock={item.stock}
                  price={item.price}
                  discounted_price={item.discounted_price}
                  tax={item.tax}
                  sku={item.sku}
                  hsn={item.hsn}
                  description={item.description}
                  name={item.name}
                  categories={item.categories}
                  is_draft={item.is_draft}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  thumbnail={item.thumbnail}
                  thumbnail_link={item.thumbnail_link}
                />
              ))
            ) : (
              <TableRowNotFound colSpan={8} />
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </PhotoProvider>
  );
}

export default ProductTable;
