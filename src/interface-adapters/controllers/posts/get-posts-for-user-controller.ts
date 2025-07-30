import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { IGetPostForUserUseCase } from "@/application/use-case/get-posts-for-user-usecase";

function presenter(posts: Post[]) {
  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    author: "Manager",
    tanggal: p.date,
  }));
}

export type IGetPostForUserUserController = ReturnType<
  typeof getPostForUserController
>;

export const getPostForUserController =
  (getPostForUserUseCase: IGetPostForUserUseCase) =>
  async (
    sessionId: string,
    query: PostsQuery
  ): Promise<ReturnType<typeof presenter>> => {
    //nanti tambahakn authentication disini
    const posts = await getPostForUserUseCase(query);
    return presenter(posts);
  };
