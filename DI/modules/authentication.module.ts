import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { BetterAuthAuthenticationServices } from "@/infrastructure/services/authentication.service.better-auth";
import { signOutUseCase } from "@/application/use-case/auth/sign-out.use-case";
import { signOutController } from "@/interface-adapters/controllers/auth/sign-out.controller";
import { signInUseCase } from "@/application/use-case/auth/sign-in.use-case";
import { signUpUseCase } from "@/application/use-case/auth/sign-up.use-case";
import { signInController } from "@/interface-adapters/controllers/auth/sign-in.controller";
import { signUpController } from "@/interface-adapters/controllers/auth/sign-up.controller";

export function createAuthenticationModule() {
  const authenticationModule = createModule();
  authenticationModule
    .bind(DI_SYMBOLS.IAuthenticationServices)
    .toClass(BetterAuthAuthenticationServices);

  authenticationModule
    .bind(DI_SYMBOLS.ISignOutUseCase)
    .toHigherOrderFunction(signOutUseCase, [
      DI_SYMBOLS.IAuthenticationServices,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInUseCase)
    .toHigherOrderFunction(signInUseCase, [DI_SYMBOLS.IAuthenticationServices]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignUpUseCase)
    .toHigherOrderFunction(signUpUseCase, [
      DI_SYMBOLS.IAuthenticationServices,
      DI_SYMBOLS.IUserRepository,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignOutController)
    .toHigherOrderFunction(signOutController, [
      DI_SYMBOLS.ISignOutUseCase,
      DI_SYMBOLS.IInstrumentationService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInController)
    .toHigherOrderFunction(signInController, [
      DI_SYMBOLS.ISignInUseCase,
      DI_SYMBOLS.IInstrumentationService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignUpController)
    .toHigherOrderFunction(signUpController, [
      DI_SYMBOLS.ISignUpUseCase,
      DI_SYMBOLS.IInstrumentationService,
    ]);
  return authenticationModule;
}
