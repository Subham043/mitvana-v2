import { usePaymentsExportMutation } from "@/utils/data/mutation/payments";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const PaymentExportBtn = () => {
  const paymentExportMutation = usePaymentsExportMutation();

  const onExport = useCallback(async () => {
    await paymentExportMutation.mutateAsync();
  }, [paymentExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={paymentExportMutation.isPending}
      loading={paymentExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default PaymentExportBtn;
