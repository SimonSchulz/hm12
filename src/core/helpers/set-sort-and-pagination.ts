import { PaginationAndSorting } from '../types/pagination-and-sorting';
import {paginationAndSortingDefault} from "../utils/query-default-pagination";

export function setSortAndPagination<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<P> {
  const pageNumber = query.pageNumber ? parseInt(query.pageNumber as any) : 1;
  const pageSize = query.pageSize ? parseInt(query.pageSize as any) : 10;

  return {
    ...paginationAndSortingDefault,
    ...query,
    pageNumber: isNaN(pageNumber) ? 1 : pageNumber,
    pageSize: isNaN(pageSize) ? 10 : pageSize,
    sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as P,
  };
}