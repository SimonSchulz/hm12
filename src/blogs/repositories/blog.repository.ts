import { BlogModel } from "../schemas/blog.schema"; // путь к твоей Mongoose-схеме блога
import { BlogInputDto } from "../dto/blog.input-dto";
import { BlogQueryInput } from "../types/blog-query.input";
import { Types } from "mongoose";

export const blogsRepository = {
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ items: any[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;
    const skip = (pageNumber - 1) * pageSize;

    const filter: any = {};
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    const items = await BlogModel.find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalCount = await BlogModel.countDocuments(filter);

    return { items, totalCount };
  },

  async findByIdOrFail(id: string): Promise<any | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return BlogModel.findById(id).lean();
  },

  async create(newBlog: any): Promise<any> {
    const createdBlog = await BlogModel.create(newBlog);
    return createdBlog.toObject();
  },

  async update(id: string, dto: BlogInputDto): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Blog id");
    }
    const updateResult = await BlogModel.updateOne(
      { _id: id },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );
    if (updateResult.matchedCount < 1) {
      throw new Error("Blog not exist");
    }
  },

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Blog id");
    }
    const deleteResult = await BlogModel.deleteOne({ _id: id });
    if (deleteResult.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  },
};
