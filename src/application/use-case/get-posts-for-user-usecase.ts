import { Post } from "@/entities/models/post";
import {
  IPostRepository,
  PostsQuery,
} from "../repositories/posts.repository.interface";
import { QueryResponse } from "@/entities/models/response";

export type IGetPostForUserUseCase = ReturnType<typeof getPostsForUserUsecase>;

export const getPostsForUserUsecase =
  (postRepository: IPostRepository) =>
  (query: PostsQuery): Promise<QueryResponse<Post[]>> => {
    return postRepository.getPostsForUser(query);
  };
