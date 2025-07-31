import { IGetUserDataUseCase } from "@/application/use-case/get-user-data-usecase";
import { DataNotFoundError } from "@/entities/error/common";
import { User } from "@/entities/models/user";

function presenter(userData: User) {
  return {
    email: userData.email,
    fullName: userData.fullName,
    role: userData.role,
  };
}

export const getUserDataController =
  (getUserDataUseCase: IGetUserDataUseCase) =>
  async (userId: number): Promise<ReturnType<typeof presenter>> => {
    const data = await getUserDataUseCase(userId);
    if (data) return presenter(data);
    else {
      throw new DataNotFoundError("Data tidak ditemukan");
    }
  };
