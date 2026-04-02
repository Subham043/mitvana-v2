import FilterClearBtn from "@/components/FilterClearBtn";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";
import SelectPaymentFilter from "./SelectPaymentFilter";

function PaymentFilters() {
  const { search, setSearch } = useSearchQueryParam();
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
    },
    [setSearch],
  );
  return (
    <Group gap="xs">
      <SearchField defaultValue={search} onChange={onSearchChange} />
      <SelectPaymentFilter />
      <FilterClearBtn />
    </Group>
  );
}

export default PaymentFilters;
