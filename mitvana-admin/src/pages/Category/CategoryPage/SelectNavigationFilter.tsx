import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Visible", value: "true" },
  { label: "Not Visible", value: "false" },
];

const SelectNavigationFilter = (props: PropType) => {
  const { key = "is_visible_in_navigation" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Navigation Filter"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectNavigationFilter;
