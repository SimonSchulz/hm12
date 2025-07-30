import { LikeStatus } from "../types/likes.type";
import { LikesModel } from "../schemas/likes.schema";
import { injectable } from "inversify";
import {UserModel} from "../../user/schemas/user.schema";
import {NewestLike} from "../types/newest-likes.type";

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

  async getNewestLikes(targetId: string): Promise<NewestLike[]> {
    const likes = await LikesModel.find({
      targetId,
      status: LikeStatus.Like,
    })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();

    const userIds = likes.map((like) => like.userId);

    const users = await UserModel.find({ _id: { $in: userIds } })
        .select("login")
        .lean();

    return likes.map((like) => {
      const user = users.find((u) => u._id.toString() === like.userId);
      return {
        addedAt: like.createdAt.toISOString(),
        userId: like.userId,
        login: user?.login ?? "unknown",
      };
    });
  }

}
