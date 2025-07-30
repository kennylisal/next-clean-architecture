import { IUsersRepository } from "../repositories/users.repository.interface";

export type IGetUserDataUseCase = ReturnType<typeof getUserDataUseCase>;

export const getUserDataUseCase =
  (userRepos: IUsersRepository) => (userId: number) => {
    return userRepos.getUserData(userId);
  };
