import { RequestDataEntity } from "../../core/types/request-data.entity";
import { likesInfo } from "../../likes/types/likes-info.type";

export type CommentViewModel = {
  id: string;
  content: string;
  commentatorInfo: RequestDataEntity;
  createdAt: string;
  likesInfo: likesInfo;
};
