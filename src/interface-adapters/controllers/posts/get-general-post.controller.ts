import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { IGetGeneralPostUseCase } from "@/application/use-case/get-general-post";
import { Post, PostHeader } from "@/entities/models/post";
import { PaginationQuery } from "@/entities/models/query";
import { QueryResponse } from "@/entities/models/response";

function presenter(response: QueryResponse<Post[]>) {
  const data = response.data.map((p) => ({
    author: "Manager",
    created_at: p.created_at,
    domain: [] as string[],
    post_id: p.post_id,
    title: p.title,
  }));
  return {
    page: response.page,
    totalItem: response.totalCount,
    data: data,
  };
}

export type IGetGeneralPostController = ReturnType<
  typeof getGeneralPostController
>;

export const getGeneralPostController =
  (getGeneralPost: IGetGeneralPostUseCase) =>
  async (query: PaginationQuery): Promise<ReturnType<typeof presenter>> => {
    const posts = await getGeneralPost({
      page: query.page,
      itemPerPage: query.page,
      domain: -1,
    });
    return presenter(posts);
  };
