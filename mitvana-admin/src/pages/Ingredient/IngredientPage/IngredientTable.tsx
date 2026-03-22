import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { IngredientType } from "@/utils/types";
import { Avatar, Box, Group, Menu, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import IngredientDeleteBtn from "./IngredientDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import { PhotoView, PhotoProvider } from "react-photo-view";
import { noImage } from "@/utils/constants/variable";

type IngredientTableProps = {
  ingredients: IngredientType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const IngredientTableRow = memo(
  ({
    id,
    title,
    description,
    thumbnail_link,
    createdAt,
    onEdit,
  }: IngredientType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
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
              <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize" c="dark">
                {title}
              </Text>
              {description && (
                <Text
                  fw={500}
                  fs="italic"
                  size="xs"
                  lh={1}
                  ml={3}
                  tt="lowercase"
                  mt={5}
                >
                  {description}
                </Text>
              )}
            </Box>
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
                <IngredientDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function IngredientTable({
  loading,
  ingredients,
  onEdit,
}: IngredientTableProps) {
  return (
    <PhotoProvider maskOpacity={0.5}>
      <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
        <Table highlightOnHover horizontalSpacing="md">
          <Table.Thead>
            <Table.Tr bg={"var(--mantine-color-blue-light)"}>
              <Table.Th>INGREDIENT</Table.Th>
              <Table.Th>CREATED AT</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <TableRowLoading colSpan={3} />
            ) : ingredients.length > 0 ? (
              ingredients.map((item) => (
                <IngredientTableRow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  thumbnail={item.thumbnail}
                  thumbnail_link={item.thumbnail_link}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <TableRowNotFound colSpan={3} />
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </PhotoProvider>
  );
}

export default IngredientTable;
