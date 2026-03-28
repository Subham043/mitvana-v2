import { useOrdersExportMutation } from "@/utils/data/mutation/orders";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const OrderExportBtn = () => {
  const orderExportMutation = useOrdersExportMutation();

  const onExport = useCallback(async () => {
    await orderExportMutation.mutateAsync();
  }, [orderExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={orderExportMutation.isPending}
      loading={orderExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default OrderExportBtn;
