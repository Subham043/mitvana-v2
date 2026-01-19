// useSubscriptionTable.ts

import { useSubscriptionsQuery } from "@/utils/data/query/subscription";

export function useSubscriptionTable() {

  const query = useSubscriptionsQuery();

  return {
    ...query,
  };
}
