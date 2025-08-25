import { IDomainsRepository } from "@/application/repositories/domain.repository.interface";
import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { ICrashResporterServices } from "@/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ItransactionManagerService } from "@/application/services/transaction-manager.service.interface";
import { ISignInUseCase } from "@/application/use-case/auth/sign-in.use-case";
import { ISignOutUseCase } from "@/application/use-case/auth/sign-out.use-case";
import { ISignupUseCase } from "@/application/use-case/auth/sign-up.use-case";
import { IJoinDomainMembershipUseCase } from "@/application/use-case/domain-memberships/user-join-domain-membership.usecase";
import { ICreateDomainUseCase } from "@/application/use-case/domain/create-domain.usecase";
import { IGetAvailableDomainsForUserToCreatePostUseCase } from "@/application/use-case/domain/get-avalilable-domains-for-user-to-craete-post.usecase";
import { IGetDomainsUseCase } from "@/application/use-case/domain/get-domains.usecase";
import { ICreatePostUseCase } from "@/application/use-case/posts/create-post-usecase";
import { IGetGeneralPostUseCase } from "@/application/use-case/posts/get-general-post.usecase";
import { IGetPostDetailToReadUseCase } from "@/application/use-case/posts/get-post-detail-usecase";
import { ISignInController } from "@/interface-adapters/controllers/auth/sign-in.controller";
import { ISignOutController } from "@/interface-adapters/controllers/auth/sign-out.controller";
import { ISignUpController } from "@/interface-adapters/controllers/auth/sign-up.controller";
import { IJoinDomainMembershipController } from "@/interface-adapters/controllers/domain-membership/join-domain-memebrship.controller";
import { ICreateDomainController } from "@/interface-adapters/controllers/domains/create-domain.controller";
import { IGetDomainsForCreatePostController } from "@/interface-adapters/controllers/domains/get-domains-for-create-post.controller";
import { IGetDomainForUserController } from "@/interface-adapters/controllers/domains/get-domains-for-user.controller";
import { IcreatePostController } from "@/interface-adapters/controllers/posts/create-post.controller";
import { IGetGeneralPostController } from "@/interface-adapters/controllers/posts/get-general-post.controller";
import { IGetPostDetailController } from "@/interface-adapters/controllers/posts/get-post-detail-controller";

export const DI_SYMBOLS = {
  //respositories
  IPostRepository: Symbol.for("IPostRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  IDomainRepository: Symbol.for("IDomainRepository"),
  IDomainMembershipsRepository: Symbol.for("IDomainMembershipsRepository"),

  //controller
  IGetGeneralPostController: Symbol.for("IGetGeneralPostController"),
  IGetPostDetailController: Symbol.for("IGetPostDetailController"),
  ISignOutController: Symbol.for("ISignOutController"),
  ISignUpController: Symbol.for("ISignUpController"),
  ISignInController: Symbol.for("ISignInController"),
  IGetDomainForUserController: Symbol.for("IGetDomainForUserController"),
  ICreateDomainController: Symbol.for("ICreateDomainController"),
  ICreatePostController: Symbol.for("ICreatePostController"),
  IGetDomainsForCreatePostController: Symbol.for(
    "IGetDomainsForCreatePostController"
  ),
  IJoinDomainMembershipController: Symbol.for(
    "IJoinDomainMembershipController"
  ),
  //use case
  IGetPostDetailUseCase: Symbol.for("IGetPostDetailUseCase"),
  IGetGeneralPostUseCase: Symbol.for("IGetGeneralPostUseCase"),
  ISignOutUseCase: Symbol.for("ISignOutUseCase"),
  ISignUpUseCase: Symbol.for("ISignUpUseCase"),
  ISignInUseCase: Symbol.for("ISignInUseCase"),
  ICraeteDomainsUseCase: Symbol.for("ICraeteDomainsUseCase"),
  IGetDomainUseCase: Symbol.for("IGetDomainUseCase"),
  ICreatePostUseCase: Symbol.for("ICreatePostUseCase"),
  IGetAvailableDomainsForUserToCreatePostUseCase: Symbol.for(
    "IGetAvailableDomainsForUserToCreatePostUseCase"
  ),
  IJoinDomainMembershipUseCase: Symbol.for("IJoinDomainMembershipUseCase"),

  //services
  IAuthenticationServices: Symbol.for("IAuthenticationService"),
  IAuthorizationServices: Symbol.for("IAuthorizationServices"),
  ITransactionManagerServices: Symbol.for("ITransactionManagerServices"),
  ICrashResporterService: Symbol.for("ICrashResporterService"),
  IInstrumentationService: Symbol.for("IInstrumentationService"),
};

export interface DI_RETURN_TYPES {
  //services
  IAuthenticationServices: IAuthenticationService;
  IAuthorizationServices: IAuthorizationServices;
  ITransactionManagerServices: ItransactionManagerService;
  IInstrumentationService: IInstrumentationService;
  ICrashResporterService: ICrashResporterServices;

  //repositories
  IPostRepository: IPostRepository;
  IUserRepository: IUsersRepository;
  IDomainRepository: IDomainsRepository;
  IDomainMembershipsRepository: IDomainMembershipRepository;

  //use case
  IGetPostDetailUseCase: IGetPostDetailToReadUseCase;
  IGetGeneralPostUseCase: IGetGeneralPostUseCase;
  ISignOutUseCase: ISignOutUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignUpUseCase: ISignupUseCase;
  ICraeteDomainsUseCase: ICreateDomainUseCase;
  IGetDomainUseCase: IGetDomainsUseCase;
  ICreatePostUseCase: ICreatePostUseCase;
  IGetAvailableDomainsForUserToCreatePostUseCase: IGetAvailableDomainsForUserToCreatePostUseCase;
  IJoinDomainMembershipUseCase: IJoinDomainMembershipUseCase;

  //controller
  IGetGeneralPostController: IGetGeneralPostController;
  IGetPostDetailController: IGetPostDetailController;
  ISignOutController: ISignOutController;
  ISignUpController: ISignUpController;
  ISignInController: ISignInController;
  IGetDomainForUserController: IGetDomainForUserController;
  ICreateDomainController: ICreateDomainController;
  ICreatePostController: IcreatePostController;
  IGetDomainsForCreatePostController: IGetDomainsForCreatePostController;
  IJoinDomainMembershipController: IJoinDomainMembershipController;
}
