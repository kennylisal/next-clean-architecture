import { createContainer } from "@evyweb/ioctopus";
import { createPostsModule } from "./modules/posts.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

// const applicationContainer = createContainer();
const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("PostsModules"), createPostsModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
