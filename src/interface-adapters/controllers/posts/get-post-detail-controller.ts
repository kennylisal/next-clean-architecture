import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IGetPostDetailToReadUseCase } from "@/application/use-case/posts/get-post-detail-usecase";
import { DataNotFoundError } from "@/entities/error/common";
import { Post } from "@/entities/models/post";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

function presenter(post: Post, user: string) {
  return {
    postData: post,
    authorName: user,
  };
}

export type IGetPostDetailController = ReturnType<
  typeof getPostDetailController
>;

export const getPostDetailController =
  (
    getPostDetailUserCase: IGetPostDetailToReadUseCase,
    authenticationServices: IAuthenticationService
  ) =>
  async (
    headers: ReadonlyHeaders,
    postId: number
  ): Promise<ReturnType<typeof presenter>> => {
    const session = await authenticationServices.getSessionWithHeaders(headers);
    const post = await getPostDetailUserCase(postId, session.userId);
    if (post) return presenter(post, "kenny");
    else {
      throw new DataNotFoundError("Data tidak ditemukan");
    }
  };
