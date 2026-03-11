import CustomLoading from "@/components/CustomLoading";
import { usePincodeToggleStatusMutation } from "@/utils/data/mutation/pincodes";
import { Menu } from "@mantine/core";
import { IconUserCheck, IconUserX } from "@tabler/icons-react";
import { useCallback } from "react";

const PincodeToggleStatusBtn = ({
  id,
  is_delivery_available,
}: {
  id: string;
  is_delivery_available: boolean;
}) => {
  const pincodeToggleStatus = usePincodeToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await pincodeToggleStatus.mutateAsync({
      is_delivery_available: !is_delivery_available,
    });
  }, [pincodeToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !pincodeToggleStatus.isPending ? (
          is_delivery_available ? (
            <IconUserCheck size={16} stroke={1.5} />
          ) : (
            <IconUserX size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={pincodeToggleStatus.isPending}
    >
      {pincodeToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {is_delivery_available ? "Disable Delivery" : "Enable Delivery"} </>
      )}
    </Menu.Item>
  );
};

export default PincodeToggleStatusBtn;
