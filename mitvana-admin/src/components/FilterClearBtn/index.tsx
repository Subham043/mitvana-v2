import { Button } from "@mantine/core";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

function FilterClearBtn() {
  const [_, setParams] = useSearchParams();
  const onClear = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true });
  }, [setParams]);

  return (
    <Button variant="filled" type="button" color="dark" onClick={onClear}>
      CLEAR
    </Button>
  );
}

export default FilterClearBtn;
