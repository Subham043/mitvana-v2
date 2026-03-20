import CustomLoading from "@/components/CustomLoading";
import { useProductReviewToggleStatusMutation } from "@/utils/data/mutation/product_reviews";
import { Menu } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

const ProductReviewToggleStatusBtn = ({
  id,
  status,
}: {
  id: string;
  status: "approved" | "rejected";
}) => {
  const productReviewToggleStatus = useProductReviewToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await productReviewToggleStatus.mutateAsync({
      status,
    });
  }, [productReviewToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !productReviewToggleStatus.isPending ? (
          status === "rejected" ? (
            <IconX size={16} stroke={1.5} />
          ) : (
            <IconCheck size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={productReviewToggleStatus.isPending}
    >
      {productReviewToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {status === "rejected" ? "Reject" : "Approve"} </>
      )}
    </Menu.Item>
  );
};

export default ProductReviewToggleStatusBtn;
