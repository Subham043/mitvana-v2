import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useCouponCodeDeleteMutation } from "@/utils/data/mutation/coupon_codes";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const CouponCodeDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const couponCodeDelete = useCouponCodeDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await couponCodeDelete.mutateAsync();
  }, [couponCodeDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !couponCodeDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={couponCodeDelete.isPending}
      color="red"
    >
      {couponCodeDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default CouponCodeDeleteBtn;
