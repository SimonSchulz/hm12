import {WithId} from "mongodb";
import {Blog} from "../../types/blog";
import {BlogQueryInput} from "../../types/blog-query.input";
import {PaginatedOutput} from "../../../core/types/paginated.output";
import {mapToBlogViewModel} from "./map-to-blog-view-model";

export function mapToBlogListModel(blog: WithId<Blog>[], totalCount: number, query: BlogQueryInput) :
    PaginatedOutput{
    const {
        pageNumber: page,
        pageSize,
    } = query;
        const pagesCount = Math.ceil(totalCount / pageSize);
    return {
        pagesCount,
        page,
        pageSize,
        totalCount,
        items: blog.map(mapToBlogViewModel),
    };
}