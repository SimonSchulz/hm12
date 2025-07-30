import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { BlogInputDto } from "../../dto/blog.input-dto";
import {blogService} from "../../domain/blog.service";
import { NotFoundError } from "../../../core/utils/app-response-errors";

export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogInputDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const blog = await blogService.findByIdOrFail(id);
    if (!blog) { throw new NotFoundError('Blog not found'); }
    await blogService.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    next(e);
  }
}
