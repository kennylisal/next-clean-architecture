// if (!isAuthorize) {
//   throw new AuthorizationError("User is not authorized for this action", {
//     cause: `User role is ${userRole}`,
//   });
// }

import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { AuthorizationError } from "@/entities/error/common";
import { DOMAIN_MEMBERSHIP_ROLE } from "@/entities/models/domain-membership";
import { ACCOUNT_ROLE } from "@/entities/models/user";
import { UseCaseAction, RESOURCE } from "@/entities/models/usercase-actions";
export class AuthorizationServices implements IAuthorizationServices {
  isActionPermitted(action: UseCaseAction, usedId: string): void {
    throw new Error("Method not implemented.");
  }
  isAuthorizedToCreateOrUpdateOrDelete(
    resource: RESOURCE,
    role: DOMAIN_MEMBERSHIP_ROLE
  ): void {
    if (
      role !== DOMAIN_MEMBERSHIP_ROLE.MEMBER &&
      role !== DOMAIN_MEMBERSHIP_ROLE.MODERATOR
    ) {
      throw new AuthorizationError(
        "Only members or moderators are permitted to perform this action"
      );
    }
  }
  isAuthorizedToRead(resource: RESOURCE, resourceId: number): void {
    if (resource !== RESOURCE.POST) {
      throw new AuthorizationError("Only Posts are free to read");
    }
  }
  isAuthorizedForAdministrationalAction(role: ACCOUNT_ROLE): void {
    if (role === ACCOUNT_ROLE.STUDENT) {
      throw new AuthorizationError(
        "Only teachers are permitted to do administration actions"
      );
    }
  }
}

//   if (!isAuthorized) {
//     throw new AuthorizationError("Not Authorized for admin action", {
//       cause: `User role is ${userRole}`,
//     });
//   }

//   if (!isAuthorized) {
//     throw new AuthorizationError("Not Authorized for creating post", {
//       cause: `User role is ${toDomainMembershipRole(
//         membershipDetail.member_role
//       )}`,
//     });
//   }

// if (!isAuthorize) {
//   throw new AuthorizationError("User is not authorized for this action", {
//     cause: `User role is ${userRole}`,
//   });
// }
