import { IUserRepository } from "@/interface/repositories/IUserRepository";
import UserModel, { IUser } from "@/models/user/userModel";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return await UserModel.create(user);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).exec();
  }
  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).exec();
  } 
}
