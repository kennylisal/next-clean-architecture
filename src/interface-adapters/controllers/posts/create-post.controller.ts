import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ICreatePostUseCase } from "@/application/use-case/posts/create-post-usecase";
import { AuthenticationError, InputParseError } from "@/entities/error/common";
import { InputPost, inputPostSchema } from "@/entities/models/post";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type IcreatePostController = ReturnType<typeof createPostController>;

export const createPostController =
  (
    createPostUseCase: ICreatePostUseCase,
    authenticationService: IAuthenticationService,
    instrumentationService: IInstrumentationService
  ) =>
  async (input: InputPost, headers: ReadonlyHeaders) => {
    return await instrumentationService.startSpan(
      { name: "createPost controller" },
      async () => {
        const { error: inputParseError } = inputPostSchema.safeParse(input);
        if (inputParseError) {
          throw new InputParseError("Invalid data", { cause: inputParseError });
        }
        const session = await authenticationService.getSessionWithHeaders(
          headers
        );
        if (!session) {
          throw new AuthenticationError("Session is not valid");
        }
        const res = await createPostUseCase(
          {
            author: session.userId,
            body: input.body,
            domain_id: input.domain_id,
            title: input.title,
          },
          session.userId
        );
        return {
          data: input,
          postId: res,
        };
      }
    );
  };
