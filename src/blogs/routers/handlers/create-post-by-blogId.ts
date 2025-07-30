import { NextFunction, Request, Response } from "express";
import { PostInputDto } from "../../../posts/dto/post.input-dto";
import { postService } from "../../../posts/domain/posts.service";
import { mapToPostViewModel } from "../../../posts/routers/mappers/map-to-post-view-model";
import { HttpStatus } from "../../../core/types/http-statuses";
import { NotFoundError } from "../../../core/utils/app-response-errors";
import { blogService } from "../../domain/blog.service";

export async function createPostByBlogIdHandler(
  req: Request<{ blogId: string }, {}, PostInputDto>,
  res: Response,
  next: NextFunction,
) {
  try {
    const blogId = req.params.blogId;
    let blog = await blogService.findByIdOrFail(blogId);
    if (!blog) {
      throw new NotFoundError("Blog with blogId not found");
    }
    let post = await postService.createByBlogId(req.body, blogId);
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (e: unknown) {
    next(e);
  }
}
