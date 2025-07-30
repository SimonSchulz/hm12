import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { PostInputDto } from "../../dto/post.input-dto";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";
import {postService} from "../../domain/posts.service";
import { ValidationError } from "../../../core/utils/app-response-errors";

export async function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const post = await postService.create(req.body);
    if (!post) { throw new ValidationError('Invalid data'); }
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (e: unknown) {
    next(e);
  }
}
