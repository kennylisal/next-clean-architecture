import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { IGetGeneralPostUseCase } from "@/application/use-case/get-general-post";
import { Post } from "@/entities/models/post";
import { PaginationQuery } from "@/entities/models/query";
import { QueryResponse } from "@/entities/models/response";
import { generalDomain } from "@/utils/const";

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
    totalItem: response.totalItem,
    data: data,
  };
}

export type IGetGeneralPostController = ReturnType<
  typeof getGeneralPostController
>;

export const getGeneralPostController =
  (getGeneralPost: IGetGeneralPostUseCase) =>
  async (query: PostsQuery): Promise<ReturnType<typeof presenter>> => {
    const postQuery: PostsQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== undefined)
    ) as unknown as PostsQuery;
    const posts = await getGeneralPost(postQuery);

    return presenter(posts);
  };
