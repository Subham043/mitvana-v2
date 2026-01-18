import { Table } from "@mantine/core";
import CustomLoading from "../CustomLoading";

type Props = {
  colSpan?: number | undefined;
};

function TableRowLoading({ colSpan }: Props) {
  return (
    <Table.Tr>
      <Table.Td colSpan={colSpan}>
        <CustomLoading size="sm" color="blue" />
      </Table.Td>
    </Table.Tr>
  );
}

export default TableRowLoading;
