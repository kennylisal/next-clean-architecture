import { DatabaseError } from "@/entities/error/common";
import { Knex } from "knex";

export default async function executeQuery<T>(
  query: Knex.QueryBuilder,
  operation: string,
  table: string
): Promise<T> {
  try {
    // const sql = query.toSQL().sql;
    return await query;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Uknown Database Error";
    throw new DatabaseError(message, `${operation} on ${table}`);
  }
}
