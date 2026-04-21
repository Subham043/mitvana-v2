import { SearchParamType } from "@/lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublishedProductsQueryOptions } from "@/lib/data/queries/product";

export const usePublishedProductsSuspenseQuery = (params: SearchParamType) => {
  return useSuspenseQuery(
    PublishedProductsQueryOptions(params as unknown as URLSearchParams),
  );
};
