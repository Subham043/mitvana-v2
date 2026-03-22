import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Applicable", value: "true" },
  { label: "Not Applicable", value: "false" },
];

const SelectIGSTFilter = (props: PropType) => {
  const { key = "is_igst_applicable" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select IGST Applicable"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectIGSTFilter;
