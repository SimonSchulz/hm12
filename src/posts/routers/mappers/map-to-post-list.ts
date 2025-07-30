import {WithId} from "mongodb";
import {PaginatedOutput} from "../../../core/types/paginated.output";
import {mapToPostViewModel} from "./map-to-post-view-model";
import {PostQueryInput} from "../../types/post-query.input";
import {Post} from "../../types/post";

export async function mapToPostListModel(blog: WithId<Post>[], totalCount: number, query: PostQueryInput, userId?: string) {
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
        items:  await Promise.all(blog.map(item=>mapToPostViewModel(item, userId))),
    };
}