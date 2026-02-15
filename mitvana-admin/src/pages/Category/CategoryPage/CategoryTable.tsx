import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { CategoryType } from "@/utils/types";
import { Badge, Group, Image, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import CategoryDeleteBtn from "./CategoryDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import { PhotoView, PhotoProvider } from "react-photo-view";

type CategoryTableProps = {
  categories: CategoryType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const CategoryTableRow = memo(
  ({
    id,
    name,
    slug,
    thumbnail_link,
    is_visible_in_navigation,
    createdAt,
    onEdit,
  }: CategoryType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>
          <PhotoView src={thumbnail_link}>
            <Image
              radius="md"
              h={70}
              w="auto"
              fit="contain"
              src={thumbnail_link}
              alt={name}
              style={{ cursor: "pointer" }}
              key={thumbnail_link ? thumbnail_link : id}
            />
          </PhotoView>
        </Table.Td>
        <Table.Td>{name}</Table.Td>
        <Table.Td>{slug}</Table.Td>
        <Table.Td>
          {is_visible_in_navigation ? (
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
                <CategoryDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function CategoryTable({ loading, categories, onEdit }: CategoryTableProps) {
  return (
    <PhotoProvider maskOpacity={0.5}>
      <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
        <Table highlightOnHover horizontalSpacing="md">
          <Table.Thead>
            <Table.Tr bg={"var(--mantine-color-blue-light)"}>
              <Table.Th>THUMBNAIL</Table.Th>
              <Table.Th>NAME</Table.Th>
              <Table.Th>SLUG</Table.Th>
              <Table.Th>VISIBLE IN NAVIGATION</Table.Th>
              <Table.Th>CREATED AT</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <TableRowLoading colSpan={6} />
            ) : categories.length > 0 ? (
              categories.map((item) => (
                <CategoryTableRow
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  slug={item.slug}
                  description={item.description}
                  thumbnail={item.thumbnail}
                  thumbnail_link={item.thumbnail_link}
                  is_visible_in_navigation={item.is_visible_in_navigation}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <TableRowNotFound colSpan={6} />
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </PhotoProvider>
  );
}

export default CategoryTable;
