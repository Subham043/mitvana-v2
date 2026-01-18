import { Center, Table } from "@mantine/core";

type Props = {
  colSpan?: number | undefined;
  message?: string;
};

function TableRowNotFound({ colSpan, message = "No Data Found" }: Props) {
  return (
    <Table.Tr>
      <Table.Td colSpan={colSpan}>
        <Center>{message}</Center>
      </Table.Td>
    </Table.Tr>
  );
}

export default TableRowNotFound;
