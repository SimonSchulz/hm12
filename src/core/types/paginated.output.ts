import { PostViewModel } from "../../posts/types/post-view-model";
import { BlogViewModel } from "../../blogs/types/blog-view-model";
import { UserViewModel } from "../../user/dto/user.view-model";
import { CommentViewModel } from "../../comments/types/comment-view-model";

export type PaginatedOutput = {
  page: number;
  pageSize: number;
  pagesCount: number;
  totalCount: number;
  items:
    | BlogViewModel[]
    | PostViewModel[]
    | UserViewModel[]
    | CommentViewModel[];
};
