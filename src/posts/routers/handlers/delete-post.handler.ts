import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import {postService} from "../../domain/posts.service";
import { NotFoundError } from "../../../core/utils/app-response-errors";

export async function deletePostHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const post = await postService.findByIdOrFail(id);
    if (!post) { throw new NotFoundError('Post not found'); }
    await postService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    next(e);
  }
}
