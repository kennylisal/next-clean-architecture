import { Post } from "@/entities/models/post";
import {
  IPostRepository,
  PostsQuery,
} from "../repositories/posts.repository.interface";
import { QueryResponse } from "@/entities/models/response";
import { IAuthorizationServices } from "../services/authorization.service.interface";
import {
  forbiddenActionMessage,
  RESOURCE,
  USE_CASE_ACTIONS,
  UseCaseAction,
} from "@/entities/models/usercase-actions";
import { ForbiddenActionError } from "@/entities/error/common";
import { IAuthenticationService } from "../services/authentication.service.interface";

export type IGetPostForUserUseCase = ReturnType<typeof getPostsForUserUsecase>;

export const getPostsForUserUsecase =
  (
    postRepository: IPostRepository,
    authorizationService: IAuthorizationServices,
    authenticationServices: IAuthenticationService
  ) =>
  async (query: PostsQuery): Promise<QueryResponse<Post[]>> => {
    const requestedAction: UseCaseAction = {
      action: USE_CASE_ACTIONS.READ,
      resource: RESOURCE.DOMAIN_MEMBERSHIPS,
    };
    const userId = await authenticationServices.getStringedUserId();
    const isPermitted = await authorizationService.isActionPermitted(
      requestedAction,
      userId
    );
    if (!isPermitted) {
      throw new ForbiddenActionError(
        forbiddenActionMessage(requestedAction, query.domain)
      );
    }
    return postRepository.getPosts(query);
  };
