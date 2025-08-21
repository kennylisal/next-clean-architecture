import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { MockPostRepositories } from "@/infrastructure/repositories/post.repository.mock";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";
import { getGeneralPostController } from "@/interface-adapters/controllers/posts/get-general-post.controller";
import { getPostDetailController } from "@/interface-adapters/controllers/posts/get-post-detail-controller";
import { getPostDetail } from "@/application/use-case/posts/get-post-detail-usecase";
import { getGeneralPost } from "@/application/use-case/posts/get-general-post.usecase";
import { createPostUseCase } from "@/application/use-case/posts/create-post-usecase";
import { createPostController } from "@/interface-adapters/controllers/posts/create-post.controller";

export function createPostsModule() {
  const postsModule = createModule();

  //disini khusus untuk repo -> penentuan pengambilan data
  if (process.env.NODE_ENV === "test") {
    postsModule.bind(DI_SYMBOLS.IPostRepository).toClass(MockPostRepositories);
  } else {
    postsModule.bind(DI_SYMBOLS.IPostRepository).toClass(PostSQLRepositories);
  }

  postsModule
    .bind(DI_SYMBOLS.IGetGeneralPostController)
    .toHigherOrderFunction(getGeneralPostController, [
      DI_SYMBOLS.IGetGeneralPostUseCase,
    ]);

  postsModule
    .bind(DI_SYMBOLS.IGetPostDetailController)
    .toHigherOrderFunction(getPostDetailController, [
      DI_SYMBOLS.IGetPostDetailUseCase,
      DI_SYMBOLS.IAuthenticationServices,
    ]);

  postsModule
    .bind(DI_SYMBOLS.ICreatePostUseCase)
    .toHigherOrderFunction(createPostUseCase, [
      DI_SYMBOLS.IPostRepository,
      DI_SYMBOLS.IAuthorizationServices,
      DI_SYMBOLS.IUserRepository,
      DI_SYMBOLS.IDomainMembershipsRepository,
    ]);

  postsModule
    .bind(DI_SYMBOLS.ICreatePostController)
    .toHigherOrderFunction(createPostController, [
      DI_SYMBOLS.ICreatePostUseCase,
      DI_SYMBOLS.IAuthenticationServices,
    ]);

  postsModule
    .bind(DI_SYMBOLS.IGetPostDetailUseCase)
    .toHigherOrderFunction(getPostDetail, [DI_SYMBOLS.IPostRepository]);

  postsModule
    .bind(DI_SYMBOLS.IGetGeneralPostUseCase)
    .toHigherOrderFunction(getGeneralPost, [DI_SYMBOLS.IPostRepository]);

  return postsModule;
}
