import { CreateUser } from "@/entities/models/user";
import { IUsersRepository } from "../repositories/users.repository.interface";

export type ICreateUserUseCase = ReturnType<typeof createUserUseCase>;

export const createUserUseCase =
  (userRepos: IUsersRepository) => (schema: CreateUser) => {
    return userRepos.createUser(schema);
  };
