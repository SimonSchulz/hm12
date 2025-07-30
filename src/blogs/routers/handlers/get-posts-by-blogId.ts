import { NextFunction, Request, Response } from "express";
import {setSortAndPagination} from "../../../core/helpers/set-sort-and-pagination";
import {postService} from "../../../posts/domain/posts.service";
import {mapToPostListModel} from "../../../posts/routers/mappers/map-to-post-list";
import {PostQueryInput} from "../../../posts/types/post-query.input";
import { blogService } from "../../domain/blog.service";
import { HttpStatus } from "../../../core/types/http-statuses";

export async function getPostsByBlogIdHandler(
    req: Request<{ blogId: string }, {}, {}, PostQueryInput>,
    res: Response,
    next: NextFunction
) {
    try {
      const blogId = req.params.blogId;
      await blogService.findByIdOrFail(blogId);

      const query = setSortAndPagination(req.query);

      const { items, totalCount } = await postService.findPostsByBlogId(blogId, query);
      const result = mapToPostListModel(items, totalCount, query);

      res.status(HttpStatus.Ok).send(result);
    } catch (e: unknown) {
        next(e);
    }
}