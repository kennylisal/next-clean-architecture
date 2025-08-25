import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ISignOutUseCase } from "@/application/use-case/auth/sign-out.use-case";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type ISignOutController = ReturnType<typeof signOutController>;

export const signOutController =
  (
    signOutUseCase: ISignOutUseCase,
    instrumentationService: IInstrumentationService
  ) =>
  async (header: ReadonlyHeaders) => {
    return await instrumentationService.startSpan(
      { name: "signout controller" },
      async () => {
        return await signOutUseCase(header);
      }
    );
  };
