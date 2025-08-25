import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;

export const signOutUseCase =
  (
    authenticationService: IAuthenticationService,
    instrumentationService: IInstrumentationService
  ) =>
  (headerInit: ReadonlyHeaders) =>
    instrumentationService.startSpan(
      { name: "signout usecase", op: "function" },
      async () => {
        return await authenticationService.signOutUserClient(headerInit);
      }
    );
