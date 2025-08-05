import { ActionLogs, CreateActionLogs } from "@/entities/models/action-logs";
import { PaginationQuery } from "@/entities/models/query";
import { QueryResponse } from "@/entities/models/response";

export interface LogsQuery extends PaginationQuery {
  dateStart?: string;
  dateEnd?: string;
  table?: string;
  user?: string;
  message?: string;
  orderBy?: "newest" | "oldest";
}

export interface IActionLogsRepository {
  createLog(data: CreateActionLogs): Promise<number>;
  getLogs(query: LogsQuery): Promise<QueryResponse<ActionLogs[]>>;
}
