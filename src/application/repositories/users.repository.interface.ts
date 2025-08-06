import { CreateUser, User } from "@/entities/models/user";

export interface IUsersRepository {
  getUserData(id: number): Promise<User>;
  // loginUser(email: string, password: string): Promise<User>;
  // registerUser(createUser: CreateUser): Promise<boolean>;
}
