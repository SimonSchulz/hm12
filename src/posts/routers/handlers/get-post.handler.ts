import { NextFunction, Request, Response } from "express";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";
import { postService } from "../../domain/posts.service";
import { NotFoundError } from "../../../core/utils/app-response-errors";

export async function getPostHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id;
    const post = await postService.findByIdOrFail(id);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    const result = mapToPostViewModel(post);
    res.send(result);
  } catch (e: unknown) {
    next(e);
  }
}
