import { useSearchParams } from "react-router";
import {
  QueryInitialPageParam,
  QueryTotalCount,
} from "@/utils/constants/query";
import { useCallback } from "react";

type PaginationQueryParamHookType = (key?: string) => {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
};

export const usePaginationQueryParam: PaginationQueryParamHookType = (
  key = "",
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageKey = `page${key}`;
  const limitKey = `limit${key}`;

  const page = Number(searchParams.get(pageKey) || QueryInitialPageParam);
  const limit = Number(searchParams.get(limitKey) || QueryTotalCount);

  const setPage = useCallback(
    (value: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(pageKey, String(value)) : params.delete(pageKey);
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams, pageKey],
  );

  const setLimit = useCallback(
    (value: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          value ? params.set(limitKey, String(value)) : params.delete(limitKey);
          return params;
        },
        { replace: true },
      ); // 👈 prevent history spam
    },
    [setSearchParams, limitKey],
  );

  return {
    page,
    limit,
    setPage,
    setLimit,
  };
};
