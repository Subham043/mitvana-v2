import { useSubscriptionsExportMutation } from "@/utils/data/mutation/subscriptions";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const SubscriptionExportBtn = () => {
  const subscriptionExportMutation = useSubscriptionsExportMutation();

  const onExport = useCallback(async () => {
    await subscriptionExportMutation.mutateAsync();
  }, [subscriptionExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={subscriptionExportMutation.isPending}
      loading={subscriptionExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default SubscriptionExportBtn;
