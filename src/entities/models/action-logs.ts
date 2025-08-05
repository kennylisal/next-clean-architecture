import z from "zod";

export interface ActionLogs {
  table_name: string;
  created_at: string;
  document_id: number;
  logs_message: string;
  user_id: string;
  log_id: number;
}

export const createActionLogs = z.object({
  table_name: z.string(),
  document_id: z.number(),
  logs_message: z.string(),
});

export type CreateActionLogs = z.infer<typeof createActionLogs>;
