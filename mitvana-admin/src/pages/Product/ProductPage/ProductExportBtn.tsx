import { useProductsExportMutation } from "@/utils/data/mutation/products";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const ProductExportBtn = () => {
  const productExportMutation = useProductsExportMutation();

  const onExport = useCallback(async () => {
    await productExportMutation.mutateAsync();
  }, [productExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={productExportMutation.isPending}
      loading={productExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default ProductExportBtn;
