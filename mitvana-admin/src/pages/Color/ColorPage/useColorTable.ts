// useColorTable.ts

import { useColorsQuery } from "@/utils/data/query/color";

export function useColorTable() {

  const query = useColorsQuery();

  return {
    ...query,
  };
}
