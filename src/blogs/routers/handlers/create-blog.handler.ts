import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { BlogInputDto } from "../../dto/blog.input-dto";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model";
import { blogService } from "../../domain/blog.service";
import { ValidationError } from "../../../core/utils/app-response-errors";

export async function createBlogHandler(
  req: Request<{}, {}, BlogInputDto>,
  res: Response,
  next: NextFunction,
) {
  try {
    const createdBlog = await blogService.create(req.body);
    if (!createdBlog) {
      throw new ValidationError("Invalid data");
    }
    const blogViewModel = mapToBlogViewModel(createdBlog);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    next(e);
  }
}
