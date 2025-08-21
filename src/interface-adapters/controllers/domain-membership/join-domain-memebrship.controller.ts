import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IJoinDomainMembershipUseCase } from "@/application/use-case/domain-memberships/user-join-domain-membership.usecase";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type IJoinDomainMembershipController = ReturnType<
  typeof joinDomainMembershipController
>;

export const joinDomainMembershipController =
  (
    joinDomainMembership: IJoinDomainMembershipUseCase,
    authenticationServices: IAuthenticationService
  ) =>
  async (domainId: number, headers: ReadonlyHeaders) => {
    const session = await authenticationServices.getSessionWithHeaders(headers);
    await joinDomainMembership(session.userId, domainId);
    return true;
  };
