import { IDomainRepository } from "@/application/repositories/domain.repository.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { AuthorizationError } from "@/entities/error/common";
import { CreateDomain } from "@/entities/models/domain";

export type ICreateDomainUseCase = ReturnType<typeof createDomain>;

export const createDomain =
  (
    domainRepo: IDomainRepository,
    userDetailRepo: IUsersRepository,
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
    return await domainRepo.createDomain(domainData);
  };
