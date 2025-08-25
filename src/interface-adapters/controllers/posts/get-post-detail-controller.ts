import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { IGetPostDetailToReadUseCase } from "@/application/use-case/posts/get-post-detail-usecase";
import { DataNotFoundError } from "@/entities/error/common";
import { Post } from "@/entities/models/post";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

function presenter(
  post: Post,
  user: string,
  instrumentationService: IInstrumentationService
) {
  return instrumentationService.startSpan(
    { name: "getPostDetail presenter", op: "serialize" },
    () => {
      return {
        postData: post,
        authorName: user,
      };
    }
  );
}

export type IGetPostDetailController = ReturnType<
  typeof getPostDetailController
>;

export const getPostDetailController =
  (
    getPostDetailUserCase: IGetPostDetailToReadUseCase,
    authenticationServices: IAuthenticationService,
    instrumentationService: IInstrumentationService
  ) =>
  async (
    headers: ReadonlyHeaders,
    postId: number
  ): Promise<ReturnType<typeof presenter>> => {
    return await instrumentationService.startSpan(
      { name: "getPostDetail controller" },
      async () => {
        const session = await authenticationServices.getSessionWithHeaders(
          headers
        );
        const post = await getPostDetailUserCase(postId, session.userId);
        if (post) return presenter(post, "kenny", instrumentationService);
        else {
          throw new DataNotFoundError("Data tidak ditemukan");
        }
      }
    );
  };
