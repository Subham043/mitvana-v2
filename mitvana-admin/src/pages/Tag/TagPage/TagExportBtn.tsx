import { useTagsExportMutation } from "@/utils/data/mutation/tags";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const TagExportBtn = () => {
  const tagExportMutation = useTagsExportMutation();

  const onExport = useCallback(async () => {
    await tagExportMutation.mutateAsync();
  }, [tagExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={tagExportMutation.isPending}
      loading={tagExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default TagExportBtn;
