import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useUserDeleteMutation } from "@/utils/data/mutation/users";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const UserDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const userDelete = useUserDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await userDelete.mutateAsync();
  }, [userDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !userDelete.isPending ? <IconTrash size={16} stroke={1.5} /> : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={userDelete.isPending}
      color="red"
    >
      {userDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default UserDeleteBtn;
