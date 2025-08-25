import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { DomainsMembershipSQLRepositories } from "@/infrastructure/repositories/domain-membership.repository.sql";
import { joinDomainMembershipController } from "@/interface-adapters/controllers/domain-membership/join-domain-memebrship.controller";
import { userJoinDomainMembership } from "@/application/use-case/domain-memberships/user-join-domain-membership.usecase";

export function createDomainsMembershipModule() {
  const domainsMembershipModule = createModule();
  domainsMembershipModule
    .bind(DI_SYMBOLS.IDomainMembershipsRepository)
    .toClass(DomainsMembershipSQLRepositories);

  domainsMembershipModule
    .bind(DI_SYMBOLS.IJoinDomainMembershipController)
    .toHigherOrderFunction(joinDomainMembershipController, [
      DI_SYMBOLS.IJoinDomainMembershipUseCase,
      DI_SYMBOLS.IAuthenticationServices,
      DI_SYMBOLS.IInstrumentationService,
    ]);

  domainsMembershipModule
    .bind(DI_SYMBOLS.IJoinDomainMembershipUseCase)
    .toHigherOrderFunction(userJoinDomainMembership, [
      DI_SYMBOLS.IDomainMembershipsRepository,
    ]);
  return domainsMembershipModule;
}
