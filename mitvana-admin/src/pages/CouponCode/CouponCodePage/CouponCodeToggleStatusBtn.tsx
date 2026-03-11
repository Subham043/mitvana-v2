import CustomLoading from "@/components/CustomLoading";
import { useCouponCodeToggleStatusMutation } from "@/utils/data/mutation/coupon_codes";
import { Menu } from "@mantine/core";
import { IconNotes, IconNotesOff } from "@tabler/icons-react";
import { useCallback } from "react";

const CouponCodeToggleStatusBtn = ({
  id,
  is_draft,
}: {
  id: string;
  is_draft: boolean;
}) => {
  const couponCodeToggleStatus = useCouponCodeToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await couponCodeToggleStatus.mutateAsync({
      is_draft: !is_draft,
    });
  }, [couponCodeToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !couponCodeToggleStatus.isPending ? (
          is_draft ? (
            <IconNotes size={16} stroke={1.5} />
          ) : (
            <IconNotesOff size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={couponCodeToggleStatus.isPending}
    >
      {couponCodeToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {is_draft ? "Publish" : "Draft"} </>
      )}
    </Menu.Item>
  );
};

export default CouponCodeToggleStatusBtn;
