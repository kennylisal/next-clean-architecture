import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { UserRepositoryPSQL } from "@/infrastructure/repositories/user.repository.sql";

export function createUserModule() {
  const userModule = createModule();
  userModule
    .bind(DI_SYMBOLS.IUserRepository)
    .toClass(UserRepositoryPSQL, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICrashResporterService,
    ]);
  return userModule;
}
