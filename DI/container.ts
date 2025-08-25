import { createContainer } from "@evyweb/ioctopus";
import { createPostsModule } from "./modules/posts.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { createTransactionManagerModule } from "./modules/transaction-manager.module";
import { createAuthenticationModule } from "./modules/authentication.module";
import { createUserModule } from "./modules/user.module";
import { createAuthorzationModule } from "./modules/authorization.module";
import { createDomainsModule } from "./modules/domains.module";
import { createDomainsMembershipModule } from "./modules/domains-membersip.module";
import { createMonitoringModule } from "./modules/monitoring.module";

// const applicationContainer = createContainer();
const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("PostsModules"), createPostsModule());

ApplicationContainer.load(Symbol("DomainsModule"), createDomainsModule());

ApplicationContainer.load(Symbol("UserModule"), createUserModule());

ApplicationContainer.load(
  Symbol("DomainsMembershipModule"),
  createDomainsMembershipModule()
);

ApplicationContainer.load(
  Symbol("AuthenticationModule"),
  createAuthenticationModule()
);

ApplicationContainer.load(
  Symbol("AuthorizationModule"),
  createAuthorzationModule()
);

ApplicationContainer.load(
  Symbol("TransactionManagerModule"),
  createTransactionManagerModule()
);

ApplicationContainer.load(Symbol("MonitoringModule"), createMonitoringModule());

ApplicationContainer.load(Symbol("UserModule"), createUserModule());
export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
