import { Post } from "@/entities/models/post";
import { IPostRepository } from "../../repositories/posts.repository.interface";
import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import {
  AuthorizationError,
  DatabaseOperationError,
} from "@/entities/error/common";

export type IGetPostDetailToReadUseCase = ReturnType<typeof getPostDetail>;

export const getPostDetail =
  (
    postsRepo: IPostRepository,
    domainMembershipRepo: IDomainMembershipRepository
  ) =>
  async (postId: number, requestUserId: string): Promise<Post | undefined> => {
    const post = await postsRepo.getPost(postId);

    if (post.domain_id !== 2020) {
      try {
        await domainMembershipRepo.getDomainMemberStatus(
          requestUserId,
          post.domain_id
        );
      } catch (error) {
        if (error instanceof DatabaseOperationError) {
          throw new AuthorizationError("Use is not a member ot post's domain");
        }
        throw new Error("Unexpected Error");
      }
    }
    return post;
  };
