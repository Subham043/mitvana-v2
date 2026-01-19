import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useSubscriptionDeleteMutation } from "@/utils/data/mutation/subscriptions";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const SubscriptionDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const subscriptionDelete = useSubscriptionDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await subscriptionDelete.mutateAsync();
  }, [subscriptionDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !subscriptionDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={subscriptionDelete.isPending}
      color="red"
    >
      {subscriptionDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default SubscriptionDeleteBtn;
