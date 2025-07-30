import { PaginationAndSorting } from "../../core/types/pagination-and-sorting";
import { UserSortField } from "./UserSortFields";

export type UserQueryInput = PaginationAndSorting<UserSortField> &
  Partial<{
    searchLoginTerm: string;
    searchEmailTerm: string;
  }>;
