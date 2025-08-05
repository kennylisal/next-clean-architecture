import { User } from "@/entities/models/user";

export interface IUsersRepository {
  getUserData(id: number): Promise<User>;
}
