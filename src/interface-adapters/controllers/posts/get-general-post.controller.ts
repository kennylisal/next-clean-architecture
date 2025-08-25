import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { IGetGeneralPostUseCase } from "@/application/use-case/posts/get-general-post.usecase";
import { Post } from "@/entities/models/post";
import { QueryResponse } from "@/entities/models/response";

function presenter(
  response: QueryResponse<Post[]>,
  instrumentationService: IInstrumentationService
) {
  return instrumentationService.startSpan(
    { name: "getGeneralPost Presenter", op: "serialize" },
    () => {
      const data = response.data.map((p) => ({
        author: "Manager",
        created_at: p.created_at,
        domain: "",
        post_id: p.post_id,
        title: p.title,
      }));
      return {
        page: response.page,
        totalItem: response.totalItem,
        data: data,
      };
    }
  );
}

export type IGetGeneralPostController = ReturnType<
  typeof getGeneralPostController
>;

export const getGeneralPostController =
  (
    getGeneralPost: IGetGeneralPostUseCase,
    instrumentationService: IInstrumentationService
  ) =>
  async (query: PostsQuery): Promise<ReturnType<typeof presenter>> => {
    return await instrumentationService.startSpan(
      { name: "getgeneralpost controller" },
      async () => {
        // throw new Error("Testing error");
        const postQuery: PostsQuery = Object.fromEntries(
          Object.entries(query).filter(([_, value]) => value !== undefined)
        ) as unknown as PostsQuery;

        const posts = await getGeneralPost(postQuery);
        return presenter(posts, instrumentationService);
      }
    );
  };
