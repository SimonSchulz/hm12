import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model";
import {blogService} from "../../domain/blog.service";

export async function getBlogHandler(req: Request, res: Response,next: NextFunction) {
  try {
    const id = req.params.id;
    const blog = await blogService.findByIdOrFail(id);
    if (!blog) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Blog not found" }]),
        );
      return;
    }
    res.send(mapToBlogViewModel(blog));
  } catch (e: unknown) {
    next(e);
  }
}
