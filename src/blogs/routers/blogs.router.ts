import { Router } from 'express';
import {authMiddleware} from "../../auth/middlewares/auth-middleware";
import {idValidation, blogIdValidation} from "../../core/utils/params-id.validation";
import {getBlogsHandler} from "./handlers/get-blogs.handler";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {inputValidationResultMiddleware} from "../../core/utils/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog.input-dto.validation";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {getPostsByBlogIdHandler} from "./handlers/get-posts-by-blogId";
import {
    postInputDtoValidation,
    postInputDtoWithoutBlogIdValidation
} from "../../posts/validation/post.input-dto.validation";
import {createPostByBlogIdHandler} from "./handlers/create-post-by-blogId";

export const blogsRouter = Router({});
const [b] = postInputDtoValidation;
blogsRouter
    .get('', getBlogsHandler)

    .get('/:id', idValidation,
        inputValidationResultMiddleware,
        getBlogHandler
    )
    .get('/:blogId/posts',
        blogIdValidation,
        getPostsByBlogIdHandler
    )
    .post(
        '',
        authMiddleware,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        createBlogHandler,
    )
    .post(
        '/:blogId/posts',
        authMiddleware,
        postInputDtoWithoutBlogIdValidation,
        inputValidationResultMiddleware,
        createPostByBlogIdHandler,
    )

    .put(
        '/:id',
        authMiddleware,
        idValidation,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        updateBlogHandler,
    )

    .delete(
        '/:id',
        authMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deleteBlogHandler,
    );