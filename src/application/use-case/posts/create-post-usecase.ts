import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { AuthorizationError } from "@/entities/error/common";
import { toDomainMembershipRole } from "@/entities/models/domain-membership";
import { CreatePost } from "@/entities/models/post";
import { ACCOUNT_ROLE } from "@/entities/models/user";
import { RESOURCE } from "@/entities/models/usercase-actions";
import { GENERAL_DOMAIN_ID } from "@/utils/const";

export type ICreatePostUseCase = ReturnType<typeof createPostUseCase>;

export const createPostUseCase =
  (
    postRepo: IPostRepository,
    authorizationService: IAuthorizationServices,
    userRepo: IUsersRepository,
    domainMembershipRepo: IDomainMembershipRepository
  ) =>
  async (postData: CreatePost, userId: string) => {
    if (postData.domain_id === GENERAL_DOMAIN_ID) {
      //general post
      const userRole: ACCOUNT_ROLE = await userRepo.getUserRole(userId);
      authorizationService.isAuthorizedForAdministrationalAction(userRole);
    } else {
      //domain post
      const membershipDetail = await domainMembershipRepo.getDomainMemberStatus(
        userId,
        postData.domain_id
      );
      if (!membershipDetail) {
        throw new AuthorizationError("User is not part of the domain");
      }

      authorizationService.isAuthorizedToCreateOrUpdateOrDelete(
        RESOURCE.POST,
        toDomainMembershipRole(membershipDetail.member_role)
      );
    }
    return await postRepo.createPost(postData);
  };
