type BasePagination = {
    page?: number;
    limit?: number;
    search?: string;
};

export function normalizePagination<T extends object = {}>(
    query?: T & BasePagination
) {
    const page = Number(query?.page ?? 1);
    const limit = Number(query?.limit ?? 10);
    const search = query?.search ?? "";

    const rest = { ...(query || {}) } as T;

    delete (rest as any).page;
    delete (rest as any).limit;
    delete (rest as any).search;

    return {
        ...rest,
        page,
        limit,
        offset: (page - 1) * limit,
        search,
    };
}

export type PaginationQuery<T = {}> = T & {
    page: number;
    limit: number;
    offset: number;
    search: string;
};

export type CountQuery<T = {}> = Omit<T & {
    search: string;
}, 'offset' | 'limit' | 'page'>;

export type PaginationResponse<T, S = {}> = {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        search: string;
    } & Omit<S, 'page' | 'limit' | 'offset' | 'search'>;
};
