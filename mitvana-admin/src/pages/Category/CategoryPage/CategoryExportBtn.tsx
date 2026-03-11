import { useCategoriesExportMutation } from "@/utils/data/mutation/categories";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const CategoryExportBtn = () => {
  const categoriesExportMutation = useCategoriesExportMutation();

  const onExport = useCallback(async () => {
    await categoriesExportMutation.mutateAsync();
  }, [categoriesExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={categoriesExportMutation.isPending}
      loading={categoriesExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default CategoryExportBtn;
