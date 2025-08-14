import { Post } from "@/entities/models/post";
import { IPostRepository } from "../repositories/posts.repository.interface";
import { IAuthorizationServices } from "../services/authorization.service.interface";

import { IAuthenticationService } from "../services/authentication.service.interface";

export type IGetPostDetailUseCase = ReturnType<typeof getPostDetailUseCase>;

export const getPostDetailUseCase =
  (
    postsRepo: IPostRepository
    // authorizationService: IAuthorizationServices,
    // authenticationServices: IAuthenticationService
  ) =>
  async (postId: number): Promise<Post | undefined> => {
    // const requestedAction: UseCaseAction = {
    //   action: USE_CASE_ACTIONS.READ,
    //   resource: RESOURCE.DOMAIN_MEMBERSHIPS,
    // };
    // const userId = await authenticationServices.getStringedUserId();

    // const isPermitted = await authorizationService.isActionPermitted(
    //   requestedAction,
    //   userId
    // );
    // if (!isPermitted) {
    //   throw new ForbiddenActionError(
    //     forbiddenActionMessage(requestedAction, postId)
    //   );
    // }
    return postsRepo.getPost(postId);
  };
