import { usePincodesExportMutation } from "@/utils/data/mutation/pincodes";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const PincodeExportBtn = () => {
  const pincodeExportMutation = usePincodesExportMutation();

  const onExport = useCallback(async () => {
    await pincodeExportMutation.mutateAsync();
  }, [pincodeExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={pincodeExportMutation.isPending}
      loading={pincodeExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default PincodeExportBtn;
