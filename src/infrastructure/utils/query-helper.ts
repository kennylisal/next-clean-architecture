import { DatabaseError, DatabaseOperationError } from "@/entities/error/common";
import { Knex } from "knex";

export default async function executeQuery<T>(
  query: Knex.QueryBuilder,
  operation: string,
  table: string
): Promise<T> {
  try {
    const result = await query;
    if (!result) {
      throw new DatabaseOperationError(`Requested ${table} data is not found`);
    }
    return result;
  } catch (error) {
    const sql = query.toSQL().sql;
    console.log(sql);
    const message =
      error instanceof Error ? error.message : "Uknown Database Error";
    throw new DatabaseError(message, `${operation} on ${table}`);
  }
}
