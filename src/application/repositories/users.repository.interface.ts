import { CreateUser, User } from "@/entities/models/user";

export interface IUsersRepository {
  // createUser(schema: CreateUser): Promise<User>;
  getUserData(id: number): Promise<User>;
}
