import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { PSQLTransactionManagerService } from "@/infrastructure/services/transaction-manager.service.psql";

export function createTransactionManagerModule() {
  const transactionManagerModule = createModule();
  transactionManagerModule
    .bind(DI_SYMBOLS.ITransactionManagerServices)
    .toClass(PSQLTransactionManagerService);

  return transactionManagerModule;
}
