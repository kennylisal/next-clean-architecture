import { Post } from "@/entities/models/post";
import { IPostRepository } from "../../repositories/posts.repository.interface";

export type IGetPostDetailToReadUseCase = ReturnType<typeof getPostDetail>;

export const getPostDetail =
  (postsRepo: IPostRepository) =>
  async (postId: number): Promise<Post | undefined> => {
    return postsRepo.getPost(postId);
  };
