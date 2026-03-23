import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Published", value: "false" },
  { label: "Draft", value: "true" },
];

const SelectProductPublishFilter = (props: PropType) => {
  const { key = "is_draft" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Publish Filter"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectProductPublishFilter;
