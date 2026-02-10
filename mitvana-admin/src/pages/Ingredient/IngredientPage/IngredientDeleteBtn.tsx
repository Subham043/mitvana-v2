import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useIngredientDeleteMutation } from "@/utils/data/mutation/ingredients";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const IngredientDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const ingredientDelete = useIngredientDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await ingredientDelete.mutateAsync();
  }, [ingredientDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !ingredientDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={ingredientDelete.isPending}
      color="red"
    >
      {ingredientDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default IngredientDeleteBtn;
