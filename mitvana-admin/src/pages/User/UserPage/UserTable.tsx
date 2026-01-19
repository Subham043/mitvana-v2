import TableRowLoading from "@/components/TableRowLoading";
import TrippleDotMenu from "@/components/TrippleDotMenu";
import PermittedLayout from "@/layouts/PermittedLayout";
import type { UserType } from "@/utils/types";
import { Avatar, Badge, Group, Menu, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import TableRowNotFound from "@/components/TableRowNotFound";
import UserDeleteBtn from "./UserDeleteBtn";
import Datetime from "@/components/Datetime";
import UserVerifyBtn from "./UserVerifyBtn";
import UserToggleStatusBtn from "./UserToggleStatusBtn";
import { memo, useCallback } from "react";

type UserTableProps = {
  users: UserType[];
  loading: boolean;
  onEdit: (id: string) => void;
};

const UserTableRow = memo(
  ({
    id,
    name,
    email,
    phone,
    is_verified,
    is_blocked,
    createdAt,
    onEdit,
  }: UserType & { onEdit: (id: string) => void }) => {
    const onEditHandler = useCallback(() => {
      onEdit(id);
    }, [onEdit, id]);
    return (
      <Table.Tr key={id}>
        <Table.Td>
          <Group gap={7}>
            <Avatar
              name={name}
              color="initials"
              alt={name}
              radius="xl"
              size={30}
            />
            <Text fw={500} size="sm" lh={1} ml={3} tt="capitalize">
              {name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td tt="lowercase">{email}</Table.Td>
        <Table.Td>{phone}</Table.Td>
        <Table.Td>
          {is_verified ? (
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
          {is_blocked ? (
            <Badge size="sm" color="red">
              Yes
            </Badge>
          ) : (
            <Badge size="sm" color="green">
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
                <UserVerifyBtn id={id} is_verified={is_verified} />
                <UserToggleStatusBtn id={id} is_blocked={is_blocked} />
                <UserDeleteBtn id={id} />
              </TrippleDotMenu>
            </Group>
          </PermittedLayout>
        </Table.Td>
      </Table.Tr>
    );
  },
);

function UserTable({ loading, users, onEdit }: UserTableProps) {
  return (
    <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
      <Table highlightOnHover horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr bg={"var(--mantine-color-blue-light)"}>
            <Table.Th>NAME</Table.Th>
            <Table.Th>EMAIL</Table.Th>
            <Table.Th>PHONE</Table.Th>
            <Table.Th>IS VERIFIED?</Table.Th>
            <Table.Th>IS BLOCKED?</Table.Th>
            <Table.Th>CREATED AT</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <TableRowLoading colSpan={7} />
          ) : users.length > 0 ? (
            users.map((item) => (
              <UserTableRow
                key={item.id}
                id={item.id}
                name={item.name}
                email={item.email}
                phone={item.phone}
                is_verified={item.is_verified}
                is_blocked={item.is_blocked}
                createdAt={item.createdAt}
                is_admin={item.is_admin}
                email_verified_at={item.email_verified_at}
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

export default UserTable;
