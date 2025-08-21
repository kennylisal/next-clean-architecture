import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { DomainsMembershipSQLRepositories } from "@/infrastructure/repositories/domain-membership.repository.sql";

export function createDomainsMembershipModule() {
  const domainsMembershipModule = createModule();
  domainsMembershipModule
    .bind(DI_SYMBOLS.IDomainMembershipsRepository)
    .toClass(DomainsMembershipSQLRepositories);
  return domainsMembershipModule;
}
