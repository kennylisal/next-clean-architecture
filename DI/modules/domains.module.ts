import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { DomainsSQLRepositories } from "@/infrastructure/repositories/domains.repository.sql";
import { getDomainsForUserController } from "@/interface-adapters/controllers/domains/get-domains-for-user.controller";
import { createDomainController } from "@/interface-adapters/controllers/domains/create-domain.controller";
import { getDomains } from "@/application/use-case/domain/get-domains.usecase";

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

  domainsModule.bind(DI_SYMBOLS.ICraeteDomainsUseCase);
  domainsModule
    .bind(DI_SYMBOLS.IGetDomainUseCase)
    .toHigherOrderFunction(getDomains, [
      DI_SYMBOLS.IDomainRepository,
      DI_SYMBOLS.IDomainMembershipsRepository,
    ]);
  return domainsModule;
}
