// useProductReviewTable.ts

import { useProductReviewsQuery } from "@/utils/data/query/product_review";

export function useProductReviewTable() {

  const query = useProductReviewsQuery();

  return {
    ...query,
  };
}
