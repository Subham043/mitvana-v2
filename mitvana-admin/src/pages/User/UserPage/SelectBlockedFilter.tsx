import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Blocked", value: "true" },
  { label: "Unblocked", value: "false" },
];

const SelectBlockedFilter = (props: PropType) => {
  const { key = "is_blocked" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Blocked"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectBlockedFilter;
