import { useOrderPdfExportMutation } from "@/utils/data/mutation/orders";
import { Button } from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import { useCallback } from "react";

const OrderViewPDFExportBtn = ({ id }: { id: string }) => {
  const orderExportMutation = useOrderPdfExportMutation(id);

  const onExport = useCallback(async () => {
    await orderExportMutation.mutateAsync();
  }, [orderExportMutation.mutateAsync]);

  return (
    <Button
      leftSection={<IconPdf size={16} />}
      variant="filled"
      color="indigo"
      type="button"
      onClick={onExport}
      disabled={orderExportMutation.isPending}
      loading={orderExportMutation.isPending}
    >
      Export Invoice
    </Button>
  );
};

export default OrderViewPDFExportBtn;
