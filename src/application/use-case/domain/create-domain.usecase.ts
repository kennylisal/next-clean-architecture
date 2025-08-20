import { IDomainRepository } from "@/application/repositories/domain.repository.interface";
import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { AuthorizationError } from "@/entities/error/common";
import { CreateDomain } from "@/entities/models/domain";
import { User } from "@/entities/models/user";

export type ICreateDomainUseCase = ReturnType<typeof createDomain>;

export const createDomain =
  (
    domainRepo: IDomainRepository,
    userDetailRepo: IUsersRepository,
    domainMembershipRepo: IDomainMembershipRepository,
    authorizationService: IAuthorizationServices
  ) =>
  async (domainData: CreateDomain, userId: string) => {
    const userRole = await userDetailRepo.getUserRole(userId);
    const isAuthorize =
      authorizationService.isAuthorizedForAdministrationalAction(userRole);
    if (!isAuthorize) {
      throw new AuthorizationError("User is not authorized for this action", {
        cause: `User role is ${userRole}`,
      });
    }
    const domainId = await domainRepo.createDomain(domainData);
    await domainMembershipRepo.createDomainMembership({
      domain_id: domainId,
      member_id: userId,
      member_role: "creator",
      membership_status: "active",
    });
    return domainId;
  };
