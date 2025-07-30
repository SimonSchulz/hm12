import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {BlogSortField} from "./BlogSortFields";

export type BlogQueryInput = PaginationAndSorting<BlogSortField> &
    Partial<{
        searchNameTerm: string;
    }>;