import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { HeroImageType } from "@/utils/types";
import { Group, Image, Menu, Table } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import HeroImageDeleteBtn from "./HeroImageDeleteBtn";
import Datetime from "@/components/Datetime";
import { memo, useCallback } from "react";
import { PhotoView, PhotoProvider } from "react-photo-view";

type HeroImageTableProps = {
  heroImages: HeroImageType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const HeroImageTableRow = memo(
  ({
    id,
    content,
    image_link,
    createdAt,
    onEdit,
  }: HeroImageType & {
    onEdit: (id: string) => void;
  }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>
          <PhotoView src={image_link}>
            <Image
              radius="md"
              h={70}
              w="auto"
              fit="contain"
              src={image_link}
              alt={content}
              style={{ cursor: "pointer" }}
              key={image_link ? image_link : id}
            />
          </PhotoView>
        </Table.Td>
        <Table.Td>{content}</Table.Td>
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
                <HeroImageDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function HeroImageTable({ loading, heroImages, onEdit }: HeroImageTableProps) {
  return (
    <PhotoProvider maskOpacity={0.5}>
      <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
        <Table highlightOnHover horizontalSpacing="md">
          <Table.Thead>
            <Table.Tr bg={"var(--mantine-color-blue-light)"}>
              <Table.Th>IMAGE</Table.Th>
              <Table.Th>CONTENT</Table.Th>
              <Table.Th>CREATED AT</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <TableRowLoading colSpan={4} />
            ) : heroImages.length > 0 ? (
              heroImages.map((item) => (
                <HeroImageTableRow
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  image={item.image}
                  image_link={item.image_link}
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
    </PhotoProvider>
  );
}

export default HeroImageTable;
