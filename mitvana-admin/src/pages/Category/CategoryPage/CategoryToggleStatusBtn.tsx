import CustomLoading from "@/components/CustomLoading";
import { useCategoryToggleStatusMutation } from "@/utils/data/mutation/categories";
import { Menu } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

const CategoryToggleStatusBtn = ({
  id,
  is_visible_in_navigation,
}: {
  id: string;
  is_visible_in_navigation: boolean;
}) => {
  const categoryToggleStatus = useCategoryToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await categoryToggleStatus.mutateAsync({
      is_visible_in_navigation: !is_visible_in_navigation,
    });
  }, [categoryToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !categoryToggleStatus.isPending ? (
          is_visible_in_navigation ? (
            <IconX size={16} stroke={1.5} />
          ) : (
            <IconCheck size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={categoryToggleStatus.isPending}
    >
      {categoryToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {is_visible_in_navigation ? "Disable Nav" : "Enable Nav"} </>
      )}
    </Menu.Item>
  );
};

export default CategoryToggleStatusBtn;
