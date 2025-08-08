import { Post } from "@/entities/models/post";
import { IPostRepository } from "../repositories/posts.repository.interface";
import { IAuthorizationServices } from "../services/authorization.service.interface";
import { ForbiddenActionError } from "@/entities/error/common";
import {
  forbiddenActionMessage,
  RESOURCE,
  USE_CASE_ACTIONS,
  UseCaseAction,
} from "@/entities/models/usercase-actions";

export type IGetPostDetailUseCase = ReturnType<typeof getPostDetailUseCase>;

export const getPostDetailUseCase =
  (postsRepo: IPostRepository, authorizationService: IAuthorizationServices) =>
  async (postId: number): Promise<Post | undefined> => {
    const requestedAction: UseCaseAction = {
      action: USE_CASE_ACTIONS.READ,
      resource: RESOURCE.POST,
    };
    const isPermitted = await authorizationService.isActionPermitted(
      requestedAction
    );
    if (!isPermitted) {
      throw new ForbiddenActionError(
        forbiddenActionMessage(requestedAction, postId)
      );
    }
    return postsRepo.getPost(postId);
  };
