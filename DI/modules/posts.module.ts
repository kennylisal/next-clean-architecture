import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { MockPostRepositories } from "@/infrastructure/repositories/post.repository.mock";
import { getPostsForUserUsecase } from "@/application/use-case/get-general-post";
import { getPostForUserController } from "@/interface-adapters/controllers/posts/get-posts-for-user-controller";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";

export function createPostsModule() {
  const postsModule = createModule();

  //disini khusus untuk repo -> penentuan pengambilan data
  if (process.env.NODE_ENV === "test") {
    postsModule.bind(DI_SYMBOLS.IPostRepository).toClass(MockPostRepositories);
  } else {
    postsModule.bind(DI_SYMBOLS.IPostRepository).toClass(PostSQLRepositories);
  }

  postsModule
    .bind(DI_SYMBOLS.IGetPostForUserUseCase)
    .toHigherOrderFunction(getPostsForUserUsecase, [
      DI_SYMBOLS.IPostRepository,
    ]);

  postsModule
    .bind(DI_SYMBOLS.IGetPostForUserUserController)
    .toHigherOrderFunction(getPostForUserController, [
      DI_SYMBOLS.IGetPostForUserUseCase,
    ]);

  return postsModule;
}
