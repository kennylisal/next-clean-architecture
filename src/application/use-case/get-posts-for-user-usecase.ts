import { IPostRepository } from "../repositories/posts.repository.interface";

export type IGetPostForUserUseCase = ReturnType<typeof getPostsForUserUsecase>;

export const getPostsForUserUsecase =
  (postRepository: IPostRepository) =>
  (userId: number): Promise<Post[]> => {
    return postRepository.getPostsForUser(userId);
  };
