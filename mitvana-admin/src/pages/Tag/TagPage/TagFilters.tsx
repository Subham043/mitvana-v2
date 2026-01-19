import SearchField from "@/components/SearchField";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import { Button, Group } from "@mantine/core";
import { useCallback } from "react";

function TagFilters() {
  const { search, setSearch } = useSearchQueryParam();
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
    },
    [setSearch],
  );
  const onClear = useCallback(() => {
    setSearch("");
  }, [setSearch]);
  return (
    <Group gap="xs">
      <SearchField defaultValue={search} onChange={onSearchChange} />
      <Button variant="filled" color="dark" onClick={onClear}>
        CLEAR
      </Button>
    </Group>
  );
}

export default TagFilters;
