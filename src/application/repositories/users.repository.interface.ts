import {
  ACCOUNT_ROLE,
  CreateUser,
  User,
  UserMetaData,
} from "@/entities/models/user";
import { Knex } from "knex";

export interface IUsersRepository {
  getUserData(id: string): Promise<User>;
  updateUserData(userId: string, metaData: UserMetaData): Promise<boolean>;
  loginUser(email: string, password: string): Promise<User>;
  createUser(
    createUser: CreateUser,
    userId: string,
    trx?: Knex.Transaction
  ): Promise<boolean>;
  getUserRole(id: string): Promise<ACCOUNT_ROLE>;
}
