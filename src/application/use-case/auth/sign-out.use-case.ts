import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;

export const signOutUseCase =
  (authenticationService: IAuthenticationService) =>
  async (headerInit: ReadonlyHeaders) => {
    return await authenticationService.signOutUserClient(headerInit);
  };
