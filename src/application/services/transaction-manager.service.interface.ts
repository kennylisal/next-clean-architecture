import { ITransaction } from "@/entities/models/transaction.interface";

export interface ItransactionManagerService {
  startTransaction<T>(
    callback: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction
  ): Promise<T>;
}
