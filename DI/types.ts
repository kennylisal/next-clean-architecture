import { IPostRepository } from "@/application/repositories/posts.repository.interface";

export const DI_SYMBOLS = {
  //respositories
  IPostRepository: Symbol.for("IPostRepository"),
};

export interface DI_RETURN_TYPES {
  //repositories
  IPostRepository: IPostRepository;
}
