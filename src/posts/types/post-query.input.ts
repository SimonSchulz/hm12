import { PaginationAndSorting } from "../../core/types/pagination-and-sorting";
import { PostSortField } from "./post-sort-fields";

export type PostQueryInput = PaginationAndSorting<PostSortField> &
  Partial<{
    searchNameTerm: string;
  }>;
