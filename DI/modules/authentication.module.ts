import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { ClerkAuthenticationService } from "@/infrastructure/services/authentication.service.clerk";

export function createAuthenticationModule() {
  const authenticationModule = createModule();
  authenticationModule
    .bind(DI_SYMBOLS.IAuthenticationServices)
    .toClass(ClerkAuthenticationService);

  //sementara tidak ada bind function ClerkAuthService
  //karena semua pakai hook dan lgsg tembak parameter
  return authenticationModule;
}
