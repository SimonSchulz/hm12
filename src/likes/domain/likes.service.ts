import { injectable, inject } from "inversify";
import { LikesRepository } from "../repositories/likes.repository";
import { LikeStatus } from "../types/likes.type";
import TYPES from "../../core/container/types";
import { commentsService } from "../../comments/service/comments.service";
import { NotFoundError } from "../../core/utils/app-response-errors";

@injectable()
export class LikesService {
  constructor(
    @inject(TYPES.LikesRepository)
    private readonly likesRepo: LikesRepository,
  ) {}

  async getLikesInfo(
    targetId: string,
    userId?: string,
  ): Promise<{
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
  }> {
    const [likesCount, dislikesCount, myStatus] = await Promise.all([
      this.likesRepo.countLikes(targetId, LikeStatus.Like),
      this.likesRepo.countLikes(targetId, LikeStatus.Dislike),
      userId ? this.likesRepo.getUserStatus(userId, targetId) : LikeStatus.None,
    ]);
    return {
      likesCount,
      dislikesCount,
      myStatus,
    };
  }

  async updateLikeStatus(
    userId: string,
    targetId: string,
    newStatus: LikeStatus,
  ): Promise<void> {
    const comment = await commentsService.findByIdOrFail(targetId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    const currentStatus = await this.likesRepo.getUserStatus(userId, targetId);
    if (currentStatus === newStatus) return;
    await this.likesRepo.setUserStatus(userId, targetId, newStatus);
  }
}
