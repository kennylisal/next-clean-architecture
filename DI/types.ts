import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { ItransactionManagerService } from "@/application/services/transaction-manager.service.interface";
import { IGetGeneralPostUseCase } from "@/application/use-case/get-general-post";
import { IGetPostDetailUseCase } from "@/application/use-case/get-post-detail-usecase";
import { IGetGeneralPostController } from "@/interface-adapters/controllers/posts/get-general-post.controller";
import { IGetPostDetailController } from "@/interface-adapters/controllers/posts/get-post-detail-controller";

export const DI_SYMBOLS = {
  //respositories
  IPostRepository: Symbol.for("IPostRepository"),

  //controller
  IGetGeneralPostController: Symbol.for("IGetGeneralPostController"),
  IGetPostDetailController: Symbol.for("IGetPostDetailController"),

  //use case
  IGetPostDetailUseCase: Symbol.for("IGetPostDetailUseCase"),
  IGetGeneralPostUseCase: Symbol.for("IGetGeneralPostUseCase"),

  //services
  IAuthenticationServices: Symbol.for("IAuthenticationService"),
  IAuthorizationServices: Symbol.for("IAuthorizationServices"),
  ITransactionManagerServices: Symbol.for("ITransactionManagerServices"),
};

export interface DI_RETURN_TYPES {
  //services
  IAuthenticationServices: IAuthenticationService;
  IAuthorizationServices: IAuthorizationServices;
  ITransactionManagerServices: ItransactionManagerService;

  //repositories
  IPostRepository: IPostRepository;

  //use case
  IGetPostDetailUseCase: IGetPostDetailUseCase;
  IGetGeneralPostUseCase: IGetGeneralPostUseCase;

  //controller
  IGetGeneralPostController: IGetGeneralPostController;
  IGetPostDetailController: IGetPostDetailController;
}
