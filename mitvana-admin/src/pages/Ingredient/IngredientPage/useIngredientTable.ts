// useIngredientTable.ts

import { useIngredientsQuery } from "@/utils/data/query/ingredient";

export function useIngredientTable() {

  const query = useIngredientsQuery();

  return {
    ...query,
  };
}
