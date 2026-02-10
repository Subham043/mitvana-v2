// useCouponCodeTable.ts

import { useCouponCodesQuery } from "@/utils/data/query/coupon_code";

export function useCouponCodeTable() {

  const query = useCouponCodesQuery();

  return {
    ...query,
  };
}
