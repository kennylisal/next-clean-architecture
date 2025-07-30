import {
  IPostRepository,
  PostsQuery,
} from "../repositories/posts.repository.interface";

export type IGetPostForUserUseCase = ReturnType<typeof getPostsForUserUsecase>;

export const getPostsForUserUsecase =
  (postRepository: IPostRepository) =>
  (query: PostsQuery): Promise<Post[]> => {
    return postRepository.getPostsForUser(query);
  };
