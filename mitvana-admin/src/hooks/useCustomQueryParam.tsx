import { useSearchParams } from "react-router";
import { useCallback } from "react";
import { PAGEKEY } from "./usePaginationQueryParam";
import { QueryInitialPageParam } from "@/utils/constants/query";

type CustomQueryParamHookType = (key: string) => {
  paramValue: string;
  setParamValue: (value: string) => void;
};

export const useCustomQueryParam: CustomQueryParamHookType = (key) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get(key) ?? "";

  const setParamValue = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(key, value) : params.delete(key);
          if (params.has(PAGEKEY)) {
            params.set(PAGEKEY, String(QueryInitialPageParam));
          }
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams, key],
  );

  return {
    paramValue,
    setParamValue,
  };
};
