import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { MockPostRepositories } from "@/infrastructure/repositories/post.repository.mock";
import { DummyJsonPostRepositories } from "@/infrastructure/repositories/post.repositories.dummyjson";

export function createPostsModule() {
  const postsModule = createModule();

  if (process.env.NODE_ENV == "test") {
    postsModule.bind(DI_SYMBOLS.IPostRepository).toClass(MockPostRepositories);
  } else {
    postsModule
      .bind(DI_SYMBOLS.IPostRepository)
      .toClass(DummyJsonPostRepositories);
  }

  return postsModule;
}
