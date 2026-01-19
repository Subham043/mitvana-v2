// useUserTable.ts

import { useUsersQuery } from "@/utils/data/query/user";

export function useUserTable() {

  const query = useUsersQuery();

  return {
    ...query,
  };
}
