// useOrderTable.ts

import { useOrdersQuery } from "@/utils/data/query/order";

export function useOrderTable() {

  const query = useOrdersQuery();

  return {
    ...query,
  };
}
