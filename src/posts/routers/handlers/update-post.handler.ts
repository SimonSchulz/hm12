import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { PostInputDto } from "../../dto/post.input-dto";
import {postService} from "../../domain/posts.service";
import { NotFoundError } from "../../../core/utils/app-response-errors";

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const post = await postService.findByIdOrFail(id);
    if (!post) { throw new NotFoundError('Post not found'); }
    await postService.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    next(e);
  }
}
