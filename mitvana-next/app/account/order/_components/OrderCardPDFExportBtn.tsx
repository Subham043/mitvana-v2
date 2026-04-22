import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useOrderPdfExportMutation } from "@/lib/data/mutations/orders";
import { useCallback } from "react";

const OrderCardPDFExportBtn = ({
  id,
  status,
  payment_status,
}: {
  id: string;
  status: string;
  payment_status: string | null;
}) => {
  const orderExportMutation = useOrderPdfExportMutation(id);

  const onExport = useCallback(async () => {
    await orderExportMutation.mutateAsync();
  }, [orderExportMutation.mutateAsync]);

  if (
    status === "Order Created" ||
    status === "Payment Failed" ||
    status === "Cancelled by Admin" ||
    status === "Cancelled By user" ||
    status === "Refunded" ||
    status === "Failed" ||
    payment_status !== "Success"
  ) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onExport}
      disabled={orderExportMutation.isPending}
      className="cursor-pointer"
    >
      {orderExportMutation.isPending ? (
        <Spinner className="size-4" />
      ) : (
        "Download Invoice"
      )}
    </Button>
  );
};

export default OrderCardPDFExportBtn;
