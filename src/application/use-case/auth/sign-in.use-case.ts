import { IAuthenticationService } from "@/application/services/authentication.service.interface";

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase =
  (authenticationService: IAuthenticationService) =>
  async (email: string, password: string) => {
    return await authenticationService.signInEmail(email, password);
  };
