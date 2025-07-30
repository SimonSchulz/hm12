import { NextFunction, Request, Response } from "express";
import {postService} from "../../domain/posts.service";
import {setSortAndPagination} from "../../../core/helpers/set-sort-and-pagination";
import {mapToPostListModel} from "../mappers/map-to-post-list";
import {PostQueryInput} from "../../types/post-query.input";
import { NotFoundError } from "../../../core/utils/app-response-errors";

export async function getPostsHandler(req: Request<{}, {}, {}, PostQueryInput>, res: Response, next: NextFunction) {
  try {
    const query = setSortAndPagination(req.query);
    const {items, totalCount} = await postService.findMany(query);
    if (!items || !items.length) {
      throw new NotFoundError('Posts not found');
    }
    const result = mapToPostListModel(items,totalCount,query);
    res.send(result);
  } catch (e: unknown) {
    next(e);
  }
}
