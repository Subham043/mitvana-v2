// usePincodeTable.ts

import { usePincodesQuery } from "@/utils/data/query/pincode";

export function usePincodeTable() {

  const query = usePincodesQuery();

  return {
    ...query,
  };
}
