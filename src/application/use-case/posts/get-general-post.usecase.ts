import { Post } from "@/entities/models/post";
import {
  IPostRepository,
  PostsQuery,
} from "../../repositories/posts.repository.interface";
import { QueryResponse } from "@/entities/models/response";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";

export type IGetGeneralPostUseCase = ReturnType<typeof getGeneralPost>;

export const getGeneralPost =
  (
    postRepository: IPostRepository,
    instrumentationService: IInstrumentationService
  ) =>
  (query: PostsQuery): Promise<QueryResponse<Post[]>> =>
    instrumentationService.startSpan(
      {
        name: "get generalPost usecase",
        op: "function",
      },
      async () => {
        return await postRepository.getPosts(query);
      }
    );
