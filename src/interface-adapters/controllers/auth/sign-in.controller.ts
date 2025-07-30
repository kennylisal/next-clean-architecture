import { ICreateUserUseCase } from "@/application/use-case/create-user-usecase";
import { CreateUser, User } from "@/entities/models/user";

function presenter(userData: User) {
  return {
    email: userData.email,
    fullName: userData.fullName,
    role: userData.role,
  };
}

export const signInUserController =
  (signUserUseCase: ICreateUserUseCase) =>
  async (schema: CreateUser): Promise<ReturnType<typeof presenter>> => {
    const data = await signUserUseCase(schema);
    return data;
  };
