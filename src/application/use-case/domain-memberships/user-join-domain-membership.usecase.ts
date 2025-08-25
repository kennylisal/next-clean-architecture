import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { AuthorizationError } from "@/entities/error/common";

export type IJoinDomainMembershipUseCase = ReturnType<
  typeof userJoinDomainMembership
>;

export const userJoinDomainMembership =
  (
    domainMembership: IDomainMembershipRepository,
    instrumentationService: IInstrumentationService
  ) =>
  (userId: string, domainId: number) =>
    instrumentationService.startSpan(
      { name: "join domainMembership usecase", op: "function" },
      async () => {
        const userHasMembership = domainMembership.getDomainMemberStatus(
          userId,
          domainId
        );
        if (userHasMembership !== undefined) {
          throw new AuthorizationError("User is already a member");
        }
        return domainMembership.createDomainMembership({
          domain_id: domainId,
          member_id: userId,
          member_role: "member",
          membership_status: "active",
        });
      }
    );
