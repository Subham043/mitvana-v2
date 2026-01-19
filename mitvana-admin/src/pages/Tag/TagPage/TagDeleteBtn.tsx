import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useTagDeleteMutation } from "@/utils/data/mutation/tags";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const TagDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const tagDelete = useTagDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await tagDelete.mutateAsync();
  }, [tagDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !tagDelete.isPending ? <IconTrash size={16} stroke={1.5} /> : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={tagDelete.isPending}
      color="red"
    >
      {tagDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default TagDeleteBtn;
