import { LogsQuery } from "@/application/repositories/action-logs.interface";
import { CreateActionLogs } from "@/entities/models/action-logs";
import knexDB from "@/infrastructure/config/knex_db";
import { ActionLogsSQLRepository } from "@/infrastructure/repositories/action-logs.repository";
import { faker } from "@faker-js/faker";

describe("Action log repo should be working", () => {
  it("should be connected to the PSQL DB", async () => {
    let isConnected = false;
    try {
      await knexDB.raw("SELECT 1");
      isConnected = true;
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw new Error("Failed to connect to test database");
    }
    await knexDB.raw("TRUNCATE TABLE action_logs RESTART IDENTITY CASCADE");
    expect(isConnected).toBe(true);
  });

  beforeAll(async () => {
    await knexDB.raw("TRUNCATE TABLE action_logs RESTART IDENTITY CASCADE");
    const logsData: CreateActionLogs[] = Array.from({ length: 20 }).map(
      (_, i) => ({
        document_id: i,
        logs_message: faker.lorem.words(10),
        table_name: faker.helpers.arrayElement([
          "posts",
          "domains",
          "domains_membership",
        ]),
        user_id: faker.helpers.replaceSymbols("????####*?*?*****#"),
      })
    );
    await knexDB("action_logs").insert(logsData);
  });
  afterAll(async () => {
    await knexDB.raw("TRUNCATE TABLE action_logs RESTART IDENTITY CASCADE");
  });
  it("should be able to insert logs", async () => {
    const repo = new ActionLogsSQLRepository();
    const insertedLog: CreateActionLogs = {
      document_id: 1,
      logs_message: "Mock logs",
      table_name: "posts",
      user_id: "user_mock",
      log_id: 420,
    };
    const insert = await repo.createLog(insertedLog);
    expect(insert).toStrictEqual(insertedLog.log_id!);
  });

  it("should be able to get logs with specified table", async () => {
    const repo = new ActionLogsSQLRepository();
    const pickedTable = faker.helpers.arrayElement([
      "posts",
      "domains",
      "domains_membership",
    ]);
    const request: LogsQuery = {
      itemPerPage: 6,
      page: 1,
      table: pickedTable,
    };
    const res = await repo.getLogs(request);
    expect(res.data).toBeInstanceOf(Array);
    expect(res.data.every((log) => log.table_name === pickedTable)).toBe(true);
  });
});
