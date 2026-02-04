import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useCategoryDeleteMutation } from "@/utils/data/mutation/categories";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const CategoryDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const categoryDelete = useCategoryDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await categoryDelete.mutateAsync();
  }, [categoryDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !categoryDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={categoryDelete.isPending}
      color="red"
    >
      {categoryDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default CategoryDeleteBtn;
