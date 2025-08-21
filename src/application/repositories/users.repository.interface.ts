import { ITransaction } from "@/entities/models/transaction.interface";
import {
  ACCOUNT_ROLE,
  CreateUser,
  User,
  UserMetaData,
} from "@/entities/models/user";

export interface IUsersRepository {
  getUserData(id: string): Promise<User>;
  updateUserData(userId: string, metaData: UserMetaData): Promise<boolean>;
  loginUser(email: string, password: string): Promise<User>;
  createUser(
    createUser: CreateUser,
    userId: string,
    trx?: ITransaction
  ): Promise<boolean>;
  getUserRole(id: string): Promise<ACCOUNT_ROLE>;
}
