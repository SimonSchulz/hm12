import { LikeStatus } from "../../likes/types/likes.type";
import container from "../../core/container/container";
import { LikesService } from "../../likes/domain/likes.service";
import TYPES from "../../core/container/types";

const likesService = container.get<LikesService>(TYPES.LikesService);
export async function mapToCommentViewModel(comment: any, userId?: string) {
  const likesInfo = await likesService.getLikesInfo(
    comment._id.toString(),
    userId,
  );

  return {
    id: comment._id.toString(),
    commentatorInfo: comment.commentatorInfo,
    content: comment.content,
    createdAt: comment.createdAt,
    likesInfo: {
      likesCount: likesInfo.likesCount ?? 0,
      dislikesCount: likesInfo.dislikesCount ?? 0,
      myStatus: likesInfo.myStatus ?? LikeStatus.None,
    },
  };
}
