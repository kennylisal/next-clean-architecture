import { DOMAIN_MEMBERSHIP_ROLE } from "@/entities/models/domain-membership";
import { ACCOUNT_ROLE } from "@/entities/models/user";
import { RESOURCE, UseCaseAction } from "@/entities/models/usercase-actions";

export interface IAuthorizationServices {
  isActionPermitted(action: UseCaseAction, usedId: string): Promise<boolean>;
  isAuthorizedToCreateOrUpdateOrDelete(
    resource: RESOURCE,
    role: DOMAIN_MEMBERSHIP_ROLE
  ): Promise<boolean>;
  isAuthorizedToRead(resource: RESOURCE, resourceId: number): Promise<boolean>;
  isAuthorizedForAdministrationalAction(role: ACCOUNT_ROLE): Promise<boolean>;
}
