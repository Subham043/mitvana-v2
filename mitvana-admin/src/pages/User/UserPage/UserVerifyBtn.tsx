import CustomLoading from "@/components/CustomLoading";
import { useUserVerifyMutation } from "@/utils/data/mutation/users";
import { Menu } from "@mantine/core";
import { IconUserStar } from "@tabler/icons-react";
import { useCallback } from "react";

const UserVerifyBtn = ({
  id,
  is_verified,
}: {
  id: string;
  is_verified: boolean;
}) => {
  const userVerify = useUserVerifyMutation(id);

  const onVerifyHandler = useCallback(async () => {
    await userVerify.mutateAsync();
  }, [userVerify.mutateAsync]);

  if (is_verified) return null;

  return (
    <Menu.Item
      leftSection={
        !userVerify.isPending ? (
          <IconUserStar size={16} stroke={1.5} />
        ) : undefined
      }
      onClick={onVerifyHandler}
      disabled={userVerify.isPending}
    >
      {userVerify.isPending ? <CustomLoading size="xs" /> : <>Verify</>}
    </Menu.Item>
  );
};

export default UserVerifyBtn;
