import { AsyncPaginate } from "react-select-async-paginate";
import { useCallback, useMemo, useRef } from "react";
import type {
  GroupBase,
  OptionsOrGroups,
  MultiValue,
} from "node_modules/react-select/dist/declarations/src";
import { getTagsHandler } from "@/utils/data/dal/tags";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  selected: MultiValue<OptionType> | undefined;
  setSelected: (tag: MultiValue<OptionType> | undefined) => void;
  placeholder?: string;
};

export default function SelectMultipleTag({
  selected,
  setSelected,
  placeholder = "Select Tags",
}: Props) {
  /** Used to cancel in-flight requests to avoid race conditions */
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadOptions = useCallback(
    async (
      search: string,
      _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional: { page: number } | undefined,
    ) => {
      // Cancel previous request if still running
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const currentPage = additional?.page ?? 1;

      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", "10");
        if (search) params.append("search", search);
        const response = await getTagsHandler(params, controller.signal);
        const options: OptionType[] = response.data.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        return {
          options: options,
          hasMore: Math.ceil(response.meta.total / 10) > currentPage,
          additional: {
            page: currentPage + 1,
          },
        };
      } catch (error) {
        return {
          options: [],
          hasMore: false,
          additional: { page: currentPage },
        };
      }
    },
    [],
  );

  const value = useMemo(() => {
    return selected ? selected : [];
  }, [selected]);

  const onChange = useCallback(
    (value: MultiValue<OptionType>) => {
      setSelected(value ? value : undefined);
    },
    [setSelected],
  );

  return (
    <div style={{ position: "relative", zIndex: 12, minWidth: "300px" }}>
      <AsyncPaginate
        value={value}
        isMulti={true}
        loadOptions={loadOptions}
        onChange={onChange}
        additional={{
          page: 1,
        }}
        placeholder={placeholder}
        debounceTimeout={500}
        isSearchable={true}
        isClearable={true}
        closeMenuOnSelect={false}
      />
    </div>
  );
}
