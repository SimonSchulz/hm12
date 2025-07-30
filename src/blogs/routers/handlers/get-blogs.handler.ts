import { NextFunction, Request, Response } from "express";
import { setSortAndPagination } from "../../../core/helpers/set-sort-and-pagination";
import { BlogQueryInput } from "../../types/blog-query.input";
import { mapToBlogListModel } from "../mappers/map-to-blog-list-model";
import { blogService } from "../../domain/blog.service";
import { ValidationError } from "../../../core/utils/app-response-errors";

export async function getBlogsHandler(
  req: Request<{}, {}, {}, BlogQueryInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = setSortAndPagination(req.query);
    const { items, totalCount } = await blogService.findMany(query);
    if (!items) {
      throw new ValidationError("Invalid data");
    }
    const result = mapToBlogListModel(items, totalCount, query);
    res.send(result);
  } catch (e: unknown) {
    next(e);
  }
}
