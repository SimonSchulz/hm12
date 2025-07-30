import {LikeStatus} from "./likes.type";
import {NewestLike} from "./newest-likes.type";

export type extendedLikesInfo = {
    likesCount: Number;
    dislikesCount: Number;
    myStatus: LikeStatus;
    newestLikes: NewestLike[];
};
