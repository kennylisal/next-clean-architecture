import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IGetPostDetailUseCase } from "@/application/use-case/get-post-detail-usecase";
import { DataNotFoundError } from "@/entities/error/common";
import { Post } from "@/entities/models/post";

function presenter(post: Post, user: string) {
  return {
    content: post.body,
    user: user,
    title: post.title,
  };
}

export type IGetPostDetailController = ReturnType<
  typeof getPostDetailController
>;

export const getPostDetailController =
  (
    getPostDetailUserCase: IGetPostDetailUseCase,
    authenticationServices: IAuthenticationService
  ) =>
  async (
    sessionId: string | undefined,
    sessionToken: string | undefined,
    postId: number
  ): Promise<ReturnType<typeof presenter>> => {
    const session = await authenticationServices.verifySession(
      sessionId,
      sessionToken
    );

    //nanti cek kelengkapan
    const post = await getPostDetailUserCase(postId);
    if (post) return presenter(post, "kenny");
    else {
      throw new DataNotFoundError("Data tidak ditemukan");
    }
  };
