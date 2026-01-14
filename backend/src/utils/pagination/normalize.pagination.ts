export function normalizePagination(
    query?: { page?: number; limit?: number, search?: string }
) {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;
    const search = query?.search ?? "";

    return {
        page: Number(page),
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
        search,
    };
}

export type PaginationQuery = ReturnType<typeof normalizePagination>;

export type PaginationResponse<T> = {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        search: string;
    };
};
