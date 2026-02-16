import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useOfferDeleteMutation } from "@/utils/data/mutation/offers";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const OfferDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const offerDelete = useOfferDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await offerDelete.mutateAsync();
  }, [offerDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !offerDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={offerDelete.isPending}
      color="red"
    >
      {offerDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default OfferDeleteBtn;
