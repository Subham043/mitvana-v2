// useCategoryTable.ts

import { useCategoriesQuery } from "@/utils/data/query/category";

export function useCategoryTable() {

  const query = useCategoriesQuery();

  return {
    ...query,
  };
}
