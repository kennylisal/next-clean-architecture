import { Post } from "@/entities/models/post";
import {
  IPostRepository,
  PostsQuery,
} from "../repositories/posts.repository.interface";
import { QueryResponse } from "@/entities/models/response";

export type IGetGeneralPostUseCase = ReturnType<typeof getGeneralPost>;

export const getGeneralPost =
  (postRepository: IPostRepository) =>
  async (query: PostsQuery): Promise<QueryResponse<Post[]>> => {
    return postRepository.getPosts(query);
  };
