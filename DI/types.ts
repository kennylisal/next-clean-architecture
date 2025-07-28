import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IGetPostForUserUseCase } from "@/application/use-case/get-posts-for-user-usecase";
import { IGetPostForUserUserController } from "@/interface-adapters/controllers/posts/get-posts-for-user-controller";

export const DI_SYMBOLS = {
  //respositories
  IPostRepository: Symbol.for("IPostRepository"),

  //controller
  IGetPostForUserUserController: Symbol.for("IGetPostForUserUserController"),
  //use case
  IGetPostForUserUseCase: Symbol.for("IGetPostForUserUseCase"),
};

export interface DI_RETURN_TYPES {
  //repositories
  IPostRepository: IPostRepository;

  //use case
  IGetPostForUserUseCase: IGetPostForUserUseCase;

  //controller
  IGetPostForUserUserController: IGetPostForUserUserController;
}
