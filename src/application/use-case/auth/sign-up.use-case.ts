import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { CreateUser } from "@/entities/models/user";

export type ISignupUseCase = ReturnType<typeof signUpUseCase>;

export const signUpUseCase =
  (
    authenticationService: IAuthenticationService,
    userDetailRepository: IUsersRepository
  ) =>
  async (userData: CreateUser) => {
    try {
      //disini dibikinkan juga
      const res = await authenticationService.signUpEmail(
        userData.user_email,
        userData.user_password
      );
      await userDetailRepository.createUser(userData, res);
      return true;
    } catch (error) {
      throw error;
    }
  };
