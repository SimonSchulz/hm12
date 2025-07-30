import express, { Express } from "express";
import {
  AUTH_PATH,
  BLOGS_PATH,
  COMMENT_PATH,
  POSTS_PATH,
  SESSION_DEVICES_PATH,
  TESTING_PATH,
  USER_PATH,
} from "./core/paths/paths";
import { postsRouter } from "./posts/routers/posts.router";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { testingRouter } from "./testing/testing.router";
import { errorHandlerMiddleware } from "./core/utils/error-handler-middleware";
import { authRouter } from "./auth/routers/auth.router";
import { commentsRouter } from "./comments/routers/comment.router";
import { HttpStatus } from "./core/types/http-statuses";
import cookieParser from "cookie-parser";
import { sessionDevicesRouter } from "./security/devices/routes/session-devices.router";
import { usersRouter } from "./user/routers/users.router";

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.set("trust proxy", true);
  app.get("/", (req, res) => {
    res.status(HttpStatus.Ok).send("server works!");
  });
  app.use(AUTH_PATH, authRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(USER_PATH, usersRouter);
  app.use(COMMENT_PATH, commentsRouter);
  app.use(SESSION_DEVICES_PATH, sessionDevicesRouter);
  app.use(TESTING_PATH, testingRouter);
  // @ts-ignore
  app.use(errorHandlerMiddleware);
  return app;
};
