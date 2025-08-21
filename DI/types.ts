import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { ItransactionManagerService } from "@/application/services/transaction-manager.service.interface";
import { ISignInUseCase } from "@/application/use-case/auth/sign-in.use-case";
import { ISignOutUseCase } from "@/application/use-case/auth/sign-out.use-case";
import { ISignupUseCase } from "@/application/use-case/auth/sign-up.use-case";
import { IGetGeneralPostUseCase } from "@/application/use-case/posts/get-general-post.usecase";
import { IGetPostDetailToReadUseCase } from "@/application/use-case/posts/get-post-detail-usecase";
import { ISignInController } from "@/interface-adapters/controllers/auth/sign-in.controller";
import { ISignOutController } from "@/interface-adapters/controllers/auth/sign-out.controller";
import { ISignUpController } from "@/interface-adapters/controllers/auth/sign-up.controller";
import { IGetGeneralPostController } from "@/interface-adapters/controllers/posts/get-general-post.controller";
import { IGetPostDetailController } from "@/interface-adapters/controllers/posts/get-post-detail-controller";

export const DI_SYMBOLS = {
  //respositories
  IPostRepository: Symbol.for("IPostRepository"),
  IUserRepository: Symbol.for("IUserRepository"),

  //controller
  IGetGeneralPostController: Symbol.for("IGetGeneralPostController"),
  IGetPostDetailController: Symbol.for("IGetPostDetailController"),
  ISignOutController: Symbol.for("ISignOutController"),
  ISignUpController: Symbol.for("ISignUpController"),
  ISignInController: Symbol.for("ISignInController"),
  //use case
  IGetPostDetailUseCase: Symbol.for("IGetPostDetailUseCase"),
  IGetGeneralPostUseCase: Symbol.for("IGetGeneralPostUseCase"),
  ISignOutUseCase: Symbol.for("ISignOutUseCase"),
  ISignUpUseCase: Symbol.for("ISignUpUseCase"),
  ISignInUseCase: Symbol.for("ISignInUseCase"),

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
  IUserRepository: IUsersRepository;

  //use case
  IGetPostDetailUseCase: IGetPostDetailToReadUseCase;
  IGetGeneralPostUseCase: IGetGeneralPostUseCase;
  ISignOutUseCase: ISignOutUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignUpUseCase: ISignupUseCase;

  //controller
  IGetGeneralPostController: IGetGeneralPostController;
  IGetPostDetailController: IGetPostDetailController;
  ISignOutController: ISignOutController;
  ISignUpController: ISignUpController;
  ISignInController: ISignInController;
}
