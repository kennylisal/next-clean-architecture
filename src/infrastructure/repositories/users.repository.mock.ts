import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { CreateUser, User } from "@/entities/models/user";
import { randomInt } from "node:crypto";

export class MockUsersRepository implements IUsersRepository {
  async createUser(schema: CreateUser): Promise<User> {
    return {
      email: schema.email,
      fullName: schema.fullName,
      id: randomInt(20),
      role: "Siswa",
    };
  }
  async getUserData(id: number): Promise<User> {
    return {
      email: "Mock@email",
      fullName: "Mock-Name",
      id: 10,
      role: "Mock-Role",
    };
  }
}
