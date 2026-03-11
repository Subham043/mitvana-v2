import { useIngredientsExportMutation } from "@/utils/data/mutation/ingredients";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const IngredientExportBtn = () => {
  const ingredientExportMutation = useIngredientsExportMutation();

  const onExport = useCallback(async () => {
    await ingredientExportMutation.mutateAsync();
  }, [ingredientExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={ingredientExportMutation.isPending}
      loading={ingredientExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default IngredientExportBtn;
