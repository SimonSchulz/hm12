import { WithId } from 'mongodb';
import {Post} from "../../types/post";
import {PostViewModel} from "../../types/post-view-model";
import container from "../../../core/container/container";
import {LikesService} from "../../../likes/domain/likes.service";
import TYPES from "../../../core/container/types";
import {LikeStatus} from "../../../likes/types/likes.type";
import {blogService} from "../../../blogs/domain/blog.service";
import {NotFoundError} from "../../../core/utils/app-response-errors";
const likesService = container.get<LikesService>(TYPES.LikesService);
export async function mapToPostViewModel(post: WithId<Post>, userId?: string): Promise<PostViewModel> {
    const likesInfo = await likesService.getExtendedLikesInfo(
        post._id.toString(),
        userId,
    );
    const blog = await blogService.findByIdOrFail(post.blogId);
    if (!blog) {
        throw new NotFoundError('blog not found');
    }
    const blogName = blog.name;
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: blogName,
        createdAt: post.createdAt,
        extendedLikesInfo: {
            likesCount: likesInfo.likesCount ?? 0,
            dislikesCount: likesInfo.dislikesCount ?? 0,
            myStatus: likesInfo.myStatus ?? LikeStatus.None,
            newestLikes: likesInfo.newestLikes ?? [],
        },

    };
}