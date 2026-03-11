import { useUsersExportMutation } from "@/utils/data/mutation/users";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const UserExportBtn = () => {
  const userExportMutation = useUsersExportMutation();

  const onExport = useCallback(async () => {
    await userExportMutation.mutateAsync();
  }, [userExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={userExportMutation.isPending}
      loading={userExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default UserExportBtn;
