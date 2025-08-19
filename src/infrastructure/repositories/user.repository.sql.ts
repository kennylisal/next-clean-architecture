import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { User, UserMetaData, CreateUser } from "@/entities/models/user";
import { Knex } from "knex";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";

export class UserRepositoryPSQL implements IUsersRepository {
  getUserData(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUserData(userId: string, metaData: UserMetaData): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  loginUser(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async createUser(
    createUser: CreateUser,
    userId: string,
    trx?: Knex.Transaction
  ): Promise<boolean> {
    const db = trx || knexDB;
    const query = db("user_detail").insert({
      user_id: userId,
      user_role: createUser.role,
    });

    return await executeQuery(query, "INSERT", "user_detail");
  }
}
