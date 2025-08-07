import { CreateUser, User, UserMetaData } from "@/entities/models/user";

export interface IUsersRepository {
  getUserData(id: string): Promise<User>;
  updateUserData(userId: string, metaData: UserMetaData): Promise<boolean>;
  loginUser(email: string, password: string): Promise<User>;
  registerUser(createUser: CreateUser): Promise<boolean>;
}
