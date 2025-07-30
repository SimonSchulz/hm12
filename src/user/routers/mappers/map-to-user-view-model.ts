import { UserViewModel } from "../../dto/user.view-model";
import { UserDocument } from "../../types/user.document.type";

export function mapToUserViewModel(user: UserDocument): UserViewModel {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
}
