import { IPostRepository } from "../repositories/posts.repository.interface";

export type IGetPostDetailUseCase = ReturnType<typeof getPostDetailUseCase>;

export const getPostDetailUseCase =
  (postRepos: IPostRepository) =>
  (postId: number): Promise<Post | undefined> => {
    return postRepos.getPost(postId);
  };
