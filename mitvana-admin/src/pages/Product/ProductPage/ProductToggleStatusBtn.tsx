import CustomLoading from "@/components/CustomLoading";
import { useProductToggleStatusMutation } from "@/utils/data/mutation/products";
import { Menu } from "@mantine/core";
import { IconNotes, IconNotesOff } from "@tabler/icons-react";
import { useCallback } from "react";

const ProductToggleStatusBtn = ({
  id,
  is_draft,
}: {
  id: string;
  is_draft: boolean;
}) => {
  const productToggleStatus = useProductToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await productToggleStatus.mutateAsync({
      is_draft: !is_draft,
    });
  }, [productToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !productToggleStatus.isPending ? (
          is_draft ? (
            <IconNotes size={16} stroke={1.5} />
          ) : (
            <IconNotesOff size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={productToggleStatus.isPending}
    >
      {productToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {is_draft ? "Publish" : "Draft"} </>
      )}
    </Menu.Item>
  );
};

export default ProductToggleStatusBtn;
