import { useCouponCodesExportMutation } from "@/utils/data/mutation/coupon_codes";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const CouponCodeExportBtn = () => {
  const couponCodeExportMutation = useCouponCodesExportMutation();

  const onExport = useCallback(async () => {
    await couponCodeExportMutation.mutateAsync();
  }, [couponCodeExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={couponCodeExportMutation.isPending}
      loading={couponCodeExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default CouponCodeExportBtn;
