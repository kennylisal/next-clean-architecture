import { ISignOutUseCase } from "@/application/use-case/auth/sign-out.use-case";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type ISignOutController = ReturnType<typeof signOutController>;

export const signOutController =
  (signOutUseCase: ISignOutUseCase) => async (header: ReadonlyHeaders) => {
    return await signOutUseCase(header);
  };
