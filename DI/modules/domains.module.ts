import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { DomainsSQLRepositories } from "@/infrastructure/repositories/domains.repository.sql";
import { getDomainsForUserController } from "@/interface-adapters/controllers/domains/get-domains-for-user.controller";
import { createDomainController } from "@/interface-adapters/controllers/domains/create-domain.controller";
import { getDomains } from "@/application/use-case/domain/get-domains.usecase";
import { createDomain } from "@/application/use-case/domain/create-domain.usecase";
import { getAvailableDomainsForUserToCreatePost } from "@/application/use-case/domain/get-avalilable-domains-for-user-to-craete-post.usecase";
import { getDomainsForCreatePost } from "@/interface-adapters/controllers/domains/get-domains-for-create-post.controller";

export function createDomainsModule() {
  const domainsModule = createModule();
  domainsModule
    .bind(DI_SYMBOLS.IDomainRepository)
    .toClass(DomainsSQLRepositories);

  domainsModule
    .bind(DI_SYMBOLS.IGetDomainForUserController)
    .toHigherOrderFunction(getDomainsForUserController, [
      DI_SYMBOLS.IGetDomainUseCase,
      DI_SYMBOLS.IAuthenticationServices,
    ]);

  domainsModule
    .bind(DI_SYMBOLS.ICreateDomainController)
    .toHigherOrderFunction(createDomainController, [
      DI_SYMBOLS.ICraeteDomainsUseCase,
      DI_SYMBOLS.IAuthenticationServices,
    ]);

  domainsModule
    .bind(DI_SYMBOLS.IGetDomainsForCreatePostController)
    .toHigherOrderFunction(getDomainsForCreatePost, [
      DI_SYMBOLS.IGetAvailableDomainsForUserToCreatePostUseCase,
      DI_SYMBOLS.IAuthenticationServices,
    ]);

  domainsModule
    .bind(DI_SYMBOLS.ICraeteDomainsUseCase)
    .toHigherOrderFunction(createDomain, [
      DI_SYMBOLS.IDomainRepository,
      DI_SYMBOLS.IUserRepository,
      DI_SYMBOLS.IDomainMembershipsRepository,
      DI_SYMBOLS.IAuthorizationServices,
      DI_SYMBOLS.ITransactionManagerServices,
    ]);
  domainsModule
    .bind(DI_SYMBOLS.IGetDomainUseCase)
    .toHigherOrderFunction(getDomains, [
      DI_SYMBOLS.IDomainRepository,
      DI_SYMBOLS.IDomainMembershipsRepository,
    ]);

  domainsModule
    .bind(DI_SYMBOLS.IGetAvailableDomainsForUserToCreatePostUseCase)
    .toHigherOrderFunction(getAvailableDomainsForUserToCreatePost, [
      DI_SYMBOLS.IDomainRepository,
      DI_SYMBOLS.IDomainMembershipsRepository,
    ]);
  return domainsModule;
}
