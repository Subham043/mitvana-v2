import { useOrderPdfExportMutation } from "@/utils/data/mutation/orders";
import { ActionIcon } from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import { useCallback } from "react";

const OrderPDFExportBtn = ({ id }: { id: string }) => {
  const orderExportMutation = useOrderPdfExportMutation(id);

  const onExport = useCallback(async () => {
    await orderExportMutation.mutateAsync();
  }, [orderExportMutation.mutateAsync]);

  return (
    <ActionIcon
      variant="filled"
      color="indigo"
      aria-label="Pdf"
      onClick={onExport}
      disabled={orderExportMutation.isPending}
      loading={orderExportMutation.isPending}
    >
      <IconPdf style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};

export default OrderPDFExportBtn;
