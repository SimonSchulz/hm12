import { Router, Request, Response } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { BlogModel } from "../blogs/schemas/blog.schema";
import { PostModel } from "../posts/schemas/post.schema";
import { UserModel } from "../user/schemas/user.schema";
import { CommentModel } from "../comments/schemas/comment.schema";
import { RequestLogModel } from "../auth/schemas/request-log.schema";
import { DeviceSessionModel } from "../security/devices/schemas/device-session.schema";
import { LikesModel } from "../likes/schemas/likes.schema";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await Promise.all([
    BlogModel.deleteMany({}),
    PostModel.deleteMany({}),
    UserModel.deleteMany({}),
    CommentModel.deleteMany({}),
    DeviceSessionModel.deleteMany({}),
    RequestLogModel.deleteMany({}),
    LikesModel.deleteMany({}),
  ]);
  res.sendStatus(HttpStatus.NoContent);
});
