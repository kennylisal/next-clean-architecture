import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { AuthorizationServices } from "@/infrastructure/services/authorization.services";

export function createAuthorzationModule() {
  const authorizationModule = createModule();

  authorizationModule
    .bind(DI_SYMBOLS.IAuthorizationServices)
    .toClass(AuthorizationServices);

  return authorizationModule;
}
