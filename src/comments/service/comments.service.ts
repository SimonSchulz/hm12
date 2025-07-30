import { WithId } from "mongodb";
import { CommentInputDto } from "../dto/comment.input-dto";
import { commentsRepository } from "../repositories/comment.repo";
import { RequestDataEntity } from "../../core/types/request-data.entity";
import { commentsQueryRepository } from "../repositories/comment.query.repo";
import { CommentQueryInput } from "../types/comment-query.input";
import { CommentEntity } from "../dto/comment.entity";
export const commentsService = {
  async findByIdOrFail(id: string) {
    return commentsRepository.findByIdOrFail(id);
  },
  async findCommentsByPostId(
    postId: string,
    queryDto: CommentQueryInput,
  ): Promise<{ items: WithId<CommentEntity>[]; totalCount: number }> {
    return commentsQueryRepository.findCommentsByPostId(postId, queryDto);
  },
  async create(dto: CommentInputDto, info: RequestDataEntity, postId: string) {
    const userInfo: RequestDataEntity = {
      userId: info.userId,
      userLogin: info.userLogin,
    };
    let newComment = new CommentEntity({
      content: dto.content,
      commentatorInfo: userInfo,
      postId: postId,
    });
    return commentsRepository.create(newComment);
  },
  async update(id: string, dto: CommentInputDto): Promise<void> {
    await commentsRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await commentsRepository.delete(id);
    return;
  },
};
