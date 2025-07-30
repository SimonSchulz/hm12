import {Blog} from "../types/blog";
import {blogsRepository} from "../repositories/blog.repository";
import {WithId} from "mongodb";
import {BlogQueryInput} from "../types/blog-query.input";
import {BlogInputDto} from "../dto/blog.input-dto";
import { NotFoundError } from "../../core/utils/app-response-errors";

export const blogService = {
    async findMany(
        queryDto: BlogQueryInput,
    ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        return blogsRepository.findMany(queryDto);
    },

    async findByIdOrFail(id: string): Promise<WithId<Blog> | null> {
      const blog = await blogsRepository.findByIdOrFail(id);
      if (!blog) {
        throw new NotFoundError(`Blog with id ${id} not found`);
      }
      return blog;
    },

    async create(dto: BlogInputDto): Promise<WithId<Blog>> {
        let newBlog: Blog = {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString(),
        };

        return blogsRepository.create(newBlog);
    },

    async update(id: string, dto: BlogInputDto): Promise<void> {
        await blogsRepository.update(id, dto);
        return;
    },

    async delete(id: string): Promise<void> {
        await blogsRepository.delete(id);
        return;
    },
};