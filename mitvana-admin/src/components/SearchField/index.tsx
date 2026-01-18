import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  defaultValue?: string;
};

function SearchField({
  onChange,
  defaultValue,
  placeholder = "Search",
}: Props) {
  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      rightSectionPointerEvents="all"
      leftSection={<IconSearch size={16} />}
      flex={1}
    />
  );
}

export default SearchField;
