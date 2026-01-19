// useTagTable.ts

import { useTagsQuery } from "@/utils/data/query/tag";

export function useTagTable() {

  const query = useTagsQuery();

  return {
    ...query,
  };
}
