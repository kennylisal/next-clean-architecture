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
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ICrashResporterServices } from "@/application/services/crash-reporter.service.interface";

export class UserRepositoryPSQL implements IUsersRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashResporterServices
  ) {}
  async getUserRole(id: string): Promise<ACCOUNT_ROLE> {
    return await this.instrumentationService.startSpan(
      { name: "user repository > getUserRole" },
      async () => {
        const query = knexDB("user_detail")
          .where("user_id", id)
          .select("user_role")
          .first();
        const res = await executeQuery(
          query,
          "READ",
          "user_detail",
          this.crashReporterService
        );

        const role = res as { user_role: string };
        const userRole = role.user_role as ACCOUNT_ROLE;

        if (!Object.values(ACCOUNT_ROLE).includes(userRole)) {
          throw new Error(`Invalid user role: ${userRole}`);
        }

        return userRole;
      }
    );
  }

  async createUser(
    createUser: CreateUser,
    userId: string,
    trx?: Knex.Transaction
  ): Promise<boolean> {
    return await this.instrumentationService.startSpan(
      { name: "user repository > createUser" },
      async () => {
        const db = trx || knexDB;
        const query = db("user_detail").insert({
          user_id: userId,
          user_role: createUser.role,
        });

        return await executeQuery(
          query,
          "INSERT",
          "user_detail",
          this.crashReporterService
        );
      }
    );
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
