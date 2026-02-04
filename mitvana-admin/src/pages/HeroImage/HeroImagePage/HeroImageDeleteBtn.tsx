import CustomLoading from "@/components/CustomLoading";
import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useHeroImageDeleteMutation } from "@/utils/data/mutation/hero_images";
import { Menu } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

const HeroImageDeleteBtn = ({ id }: { id: string }) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const heroImageDelete = useHeroImageDeleteMutation(id);

  const onDelete = useCallback(async () => {
    await heroImageDelete.mutateAsync();
  }, [heroImageDelete.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !heroImageDelete.isPending ? (
          <IconTrash size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={() => handleDeleteModalOpen(onDelete)}
      disabled={heroImageDelete.isPending}
      color="red"
    >
      {heroImageDelete.isPending ? <CustomLoading size="xs" /> : <>Delete</>}
    </Menu.Item>
  );
};

export default HeroImageDeleteBtn;
