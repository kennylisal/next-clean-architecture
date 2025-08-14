import { ItransactionManagerService } from "@/application/services/transaction-manager.service.interface";
import { ITransaction } from "@/entities/models/transaction.interface";
import knexDB from "../config/knex_db";
import { Knex } from "knex";
import { PostSQLRepositories } from "../repositories/post.repository.sql";
import { DatabaseError } from "@/entities/error/common";

const db = knexDB;

export class PSQLTransactionManagerService
  implements ItransactionManagerService
{
  public async startTransaction<T>(
    clb: (tx: PSQLTransaction) => Promise<T>,
    parent?: PSQLTransaction
  ): Promise<T> {
    // Use parent transaction if provided, otherwise use main db
    const invoker = parent instanceof PSQLTransaction ? parent.trx : db;
    return invoker.transaction(async (trx) => {
      const transaction = new PSQLTransaction(trx);
      try {
        const result = await clb(transaction);
        await transaction.commit();
        return result;
      } catch (error) {
        await transaction.rollback();
        const message =
          error instanceof Error
            ? error.message
            : "Unexpected Error while using TransactionM";
        throw new DatabaseError(message, "failed at transaction manager");
      }
    });
  }
}

export class PSQLTransaction implements ITransaction {
  readonly trx: Knex.Transaction;
  constructor(trx: Knex.Transaction) {
    this.trx = trx;
  }
  async commit() {
    await this.trx.commit();
  }
  async rollback() {
    await this.trx.rollback();
  }
}

// const tsm = new TransactionManagerService();
// tsm.startTransaction(async (t) => {
//   const repo = new PostSQLRepositories();
//   await repo.getPost(0);
// });
