import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useProductDeleteMutation } from "@/utils/data/mutation/products";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const ProductDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const productDelete = useProductDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await productDelete.mutateAsync();
  }, [productDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !productDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={productDelete.isPending}
      color="red"
    >
      {productDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default ProductDeleteBtn;
