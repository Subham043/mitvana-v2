import CustomLoading from "@/components/CustomLoading";
import { useUserToggleStatusMutation } from "@/utils/data/mutation/users";
import { Menu } from "@mantine/core";
import { IconUserCheck, IconUserX } from "@tabler/icons-react";
import { useCallback } from "react";

const UserToggleStatusBtn = ({
  id,
  is_blocked,
}: {
  id: string;
  is_blocked: boolean;
}) => {
  const userToggleStatus = useUserToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await userToggleStatus.mutateAsync({ is_blocked: !is_blocked });
  }, [userToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !userToggleStatus.isPending ? (
          is_blocked ? (
            <IconUserCheck size={16} stroke={1.5} />
          ) : (
            <IconUserX size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={userToggleStatus.isPending}
    >
      {userToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {is_blocked ? "Unblock" : "Block"} </>
      )}
    </Menu.Item>
  );
};

export default UserToggleStatusBtn;
