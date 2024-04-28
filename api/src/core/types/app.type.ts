/** Data query paginated result type */
export type PaginationResult<T> = {
    datas: T[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
};

/** Data sort type in relational database such as PostgreSql */
export type SortByOrder = 'ASC' | 'DESC';

export type Secret = string | Buffer | { key: string | Buffer; passphrase: string };
