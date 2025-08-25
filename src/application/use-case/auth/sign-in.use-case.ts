import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase =
  (
    authenticationService: IAuthenticationService,
    instrumentationService: IInstrumentationService
  ) =>
  (email: string, password: string) =>
    instrumentationService.startSpan(
      { name: "signin usecase", op: "function" },
      async () => {
        return await authenticationService.signInEmail(email, password);
      }
    );
