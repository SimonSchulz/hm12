import { LikeStatus } from "../types/likes.type";
import { LikesModel } from "../schemas/likes.schema";
import { injectable } from "inversify";

@injectable()
export class LikesRepository {
  async getUserStatus(userId: string, targetId: string): Promise<LikeStatus> {
    const like = await LikesModel.findOne({
      userId,
      targetId,
    }).lean();
    return like?.status ?? LikeStatus.None;
  }

  async setUserStatus(
    userId: string,
    targetId: string,
    status: LikeStatus,
  ): Promise<void> {
    await LikesModel.updateOne(
      { userId, targetId },
      {
        $set: {
          status,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );
  }

  async countLikes(targetId: string, status: LikeStatus): Promise<number> {
    return LikesModel.countDocuments({
      targetId,
      status: status,
    });
  }
}
