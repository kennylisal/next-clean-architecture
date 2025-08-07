import {
  IActionLogsRepository,
  LogsQuery,
} from "@/application/repositories/action-logs.interface";
import { CreateActionLogs, ActionLogs } from "@/entities/models/action-logs";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";
import { QueryResponse } from "@/entities/models/response";

export class ActionLogsSQLRepository implements IActionLogsRepository {
  async createLog(data: CreateActionLogs): Promise<number> {
    const query = knexDB("action_logs").insert(data).returning("log_id");
    const result: { log_id: number }[] = await executeQuery(
      query,
      "INSERT",
      "action_logs"
    );
    return Number(result[0].log_id);
  }
  async getLogs(request: LogsQuery): Promise<QueryResponse<ActionLogs[]>> {
    const page = Math.max(1, request.page);
    const pageSize = Math.max(10, Math.min(100, request.itemPerPage));
    const offset = (page - 1) * pageSize;

    const query = knexDB("action_logs").select("*");

    query.modify((query) => {
      if (request.dateEnd && request.dateStart) {
        query.whereBetween("created_at", [request.dateStart, request.dateEnd]);
      }
      if (request.message) {
        query.where("logs_message", "ilike", `%${request.message}%`);
      }
      if (request.table) {
        query.where("table_name", "=", request.table);
      }
      if (!request.orderBy) {
        if (request.orderBy === "newest") {
          query.orderBy("created_at", "desc");
        } else {
          query.orderBy("created_at", "asc");
        }
      } else {
        query.orderBy("created_at", "desc");
      }
    });

    const countQuery = await query
      .clone()
      .clearSelect()
      .clearOrder()
      .count("* as total")
      .first();
    query.limit(pageSize).offset(offset);
    const res: ActionLogs[] = await executeQuery(query, "SELECT", "POSTS");

    return {
      page: page,
      data: res,
      totalCount: countQuery ? Number(countQuery.total) : 0,
    };
  }
}
