import { DOMAIN_MEMBERSHIP_ROLE } from "@/entities/models/domain-membership";
import { ACCOUNT_ROLE } from "@/entities/models/user";
import { RESOURCE, UseCaseAction } from "@/entities/models/usercase-actions";

export interface IAuthorizationServices {
  isActionPermitted(action: UseCaseAction, usedId: string): void;
  isAuthorizedToCreateOrUpdateOrDelete(
    resource: RESOURCE,
    role: DOMAIN_MEMBERSHIP_ROLE
  ): void;
  isAuthorizedToRead(resource: RESOURCE, resourceId: number): void;
  isAuthorizedForAdministrationalAction(role: ACCOUNT_ROLE): void;
}
