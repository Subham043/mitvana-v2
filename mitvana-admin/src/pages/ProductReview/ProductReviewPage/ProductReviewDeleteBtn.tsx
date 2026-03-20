import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useProductReviewDeleteMutation } from "@/utils/data/mutation/product_reviews";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const ProductReviewDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const productReviewDelete = useProductReviewDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await productReviewDelete.mutateAsync();
  }, [productReviewDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !productReviewDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={productReviewDelete.isPending}
      color="red"
    >
      {productReviewDelete.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <>Delete</>
      )}
    </Menu.Item>
  );
};

export default ProductReviewDeleteBtn;
