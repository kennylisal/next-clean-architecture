import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import {
  User,
  UserMetaData,
  CreateUser,
  ACCOUNT_ROLE,
} from "@/entities/models/user";
import { Knex } from "knex";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";

export class UserRepositoryPSQL implements IUsersRepository {
  async getUserRole(id: string): Promise<ACCOUNT_ROLE> {
    const query = knexDB("user_detail")
      .where("user_id", id)
      .select("user_role")
      .first();
    const res = await executeQuery(query, "READ", "user_detail");

    const role = res as { user_role: string };
    const userRole = role.user_role as ACCOUNT_ROLE;

    if (!Object.values(ACCOUNT_ROLE).includes(userRole)) {
      throw new Error(`Invalid user role: ${userRole}`);
    }

    return userRole;
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

  getUserData(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUserData(userId: string, metaData: UserMetaData): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  loginUser(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
