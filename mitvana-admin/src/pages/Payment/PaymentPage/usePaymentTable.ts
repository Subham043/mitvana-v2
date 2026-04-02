// usePaymentTable.ts

import { usePaymentsQuery } from "@/utils/data/query/payment";

export function usePaymentTable() {

  const query = usePaymentsQuery();

  return {
    ...query,
  };
}
