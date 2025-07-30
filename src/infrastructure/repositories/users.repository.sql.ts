import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { CreateUser, User } from "@/entities/models/user";

export class UsersSQLRepository implements IUsersRepository {
  createUser(schema: CreateUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserData(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
