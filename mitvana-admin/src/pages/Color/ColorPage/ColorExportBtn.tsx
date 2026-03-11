import { useColorsExportMutation } from "@/utils/data/mutation/colors";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const ColorExportBtn = () => {
  const colorExportMutation = useColorsExportMutation();

  const onExport = useCallback(async () => {
    await colorExportMutation.mutateAsync();
  }, [colorExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={colorExportMutation.isPending}
      loading={colorExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default ColorExportBtn;
