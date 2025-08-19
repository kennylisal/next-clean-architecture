import { createContainer } from "@evyweb/ioctopus";
import { createPostsModule } from "./modules/posts.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { createTransactionManagerModule } from "./modules/transaction-manager.module";
import { createAuthenticationModule } from "./modules/authentication.module";
import { createUserModule } from "./modules/user.module";

// const applicationContainer = createContainer();
const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("PostsModules"), createPostsModule());

ApplicationContainer.load(
  Symbol("AuthenticationModule"),
  createAuthenticationModule()
);
ApplicationContainer.load(
  Symbol("TransactionManagerModule"),
  createTransactionManagerModule()
);

ApplicationContainer.load(Symbol("UserModule"), createUserModule());
export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
