import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { usePincodeDeleteMutation } from "@/utils/data/mutation/pincodes";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const PincodeDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const pincodeDelete = usePincodeDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await pincodeDelete.mutateAsync();
  }, [pincodeDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !pincodeDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={pincodeDelete.isPending}
      color="red"
    >
      {pincodeDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default PincodeDeleteBtn;
