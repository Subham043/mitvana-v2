// useOfferTable.ts

import { useOffersQuery } from "@/utils/data/query/offer";

export function useOfferTable() {

  const query = useOffersQuery();

  return {
    ...query,
  };
}
