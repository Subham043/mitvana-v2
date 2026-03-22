import FilterClearBtn from "@/components/FilterClearBtn";
import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Group } from "@mantine/core";
import { useCallback } from "react";
import SelectCouponPublishFilter from "./SelectCouponPublishFilter";

function CouponCodeFilters() {
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
      <SelectCouponPublishFilter />
      <FilterClearBtn />
    </Group>
  );
}

export default CouponCodeFilters;
