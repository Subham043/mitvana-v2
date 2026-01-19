import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useColorDeleteMutation } from "@/utils/data/mutation/colors";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const ColorDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const colorDelete = useColorDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await colorDelete.mutateAsync();
  }, [colorDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !colorDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={colorDelete.isPending}
      color="red"
    >
      {colorDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default ColorDeleteBtn;
