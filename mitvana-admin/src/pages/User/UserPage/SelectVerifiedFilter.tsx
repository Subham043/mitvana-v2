import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Verified", value: "true" },
  { label: "Unverified", value: "false" },
];

const SelectVerifiedFilter = (props: PropType) => {
  const { key = "is_verified" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Verified"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectVerifiedFilter;
