import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { AuthorizationError } from "@/entities/error/common";
import { DOMAIN_MEMBERSHIP_ROLE } from "@/entities/models/domain-membership";
import { CreatePost } from "@/entities/models/post";
import { ACCOUNT_ROLE } from "@/entities/models/user";
import { RESOURCE } from "@/entities/models/usercase-actions";

export type ICreatePostUseCase = ReturnType<typeof createPost>;

export const createPost =
  (
    postRepo: IPostRepository,
    authorizationService: IAuthorizationServices,
    userRepo: IUsersRepository,
    domainMembershipRepo: IDomainMembershipRepository
  ) =>
  async (postData: CreatePost, userId: string) => {
    if (postData.domain_id === 2020) {
      //general post
      const userRole: ACCOUNT_ROLE = await userRepo.getUserRole(userId);
      const isAuthorized =
        await authorizationService.isAuthorizedForAdministrationalAction(
          userRole
        );
      if (!isAuthorized) {
        throw new AuthorizationError("Not Authorized for admin action", {
          cause: `User role is ${userRole}`,
        });
      }
    } else {
      //domain post
      const membershipDetail = await domainMembershipRepo.getDomainMemberStatus(
        userId,
        postData.domain_id
      );
      if (!membershipDetail) {
        throw new AuthorizationError("User is not part of the domain");
      }
      const isAuthorized =
        await authorizationService.isAuthorizedToCreateOrUpdateOrDelete(
          RESOURCE.POST,
          toDomainMembershipRole(membershipDetail.member_role)
        );
      if (!isAuthorized) {
        throw new AuthorizationError("Not Authorized for creating post", {
          cause: `User role is ${toDomainMembershipRole(
            membershipDetail.member_role
          )}`,
        });
      }
    }
    return await postRepo.createPost(postData);
  };

export function toDomainMembershipRole(value: string): DOMAIN_MEMBERSHIP_ROLE {
  if (
    Object.values(DOMAIN_MEMBERSHIP_ROLE).includes(
      value as DOMAIN_MEMBERSHIP_ROLE
    )
  ) {
    return value as DOMAIN_MEMBERSHIP_ROLE;
  } else {
    throw new Error(`Invalid role: ${value}`);
  }
}
