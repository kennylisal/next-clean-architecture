import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IGetPostForUserUseCase } from "@/application/use-case/get-posts-for-user-usecase";

function presenter(posts: Post[]) {
  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    author: "Manager",
    tanggal: p.date,
  }));
}

export const getPostForUserController =
  (getPostForUserUseCase: IGetPostForUserUseCase) =>
  async (userId: number): Promise<ReturnType<typeof presenter>> => {
    const posts = await getPostForUserUseCase(userId);
    return presenter(posts);
  };
