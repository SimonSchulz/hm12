import { injectable } from "inversify";
import { UserModel } from "../schemas/user.schema";
import { UserQueryInput } from "../types/user-query.input";
import { PaginatedOutput } from "../../core/types/paginated.output";
import { mapToUserViewModel } from "../routers/mappers/map-to-user-view-model";
import { UserViewModel } from "../dto/user.view-model";
import { UserDocument } from "../types/user.document.type";

@injectable()
export class UsersQueryRepository {
  async findAllUsers(query: UserQueryInput): Promise<PaginatedOutput> {
    const {
      sortBy,
      sortDirection,
      pageSize,
      pageNumber,
      searchLoginTerm,
      searchEmailTerm,
    } = query;

    const filter: any = {};
    if (searchLoginTerm && searchEmailTerm) {
      filter.$or = [
        { login: new RegExp(searchLoginTerm, "i") },
        { email: new RegExp(searchEmailTerm, "i") },
      ];
    } else if (searchLoginTerm) {
      filter.login = new RegExp(searchLoginTerm, "i");
    } else if (searchEmailTerm) {
      filter.email = new RegExp(searchEmailTerm, "i");
    }

    const totalCount = await UserModel.countDocuments(filter);

    const users = await UserModel.find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: users.map(mapToUserViewModel),
    };
  }

  async findById(id: string): Promise<UserViewModel | null> {
    const user = await UserModel.findById(id);
    return user ? mapToUserViewModel(user) : null;
  }
  async findByRecoveryCode(code: string): Promise<UserDocument | null> {
    return UserModel.findOne({ "passwordRecovery.recoveryCode": code });
  }
}
