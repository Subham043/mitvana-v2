import { useOffersExportMutation } from "@/utils/data/mutation/offers";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const OfferExportBtn = () => {
  const offerExportMutation = useOffersExportMutation();

  const onExport = useCallback(async () => {
    await offerExportMutation.mutateAsync();
  }, [offerExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={offerExportMutation.isPending}
      loading={offerExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default OfferExportBtn;
