import { IDomainsRepository } from "@/application/repositories/domain.repository.interface";
import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { IAuthorizationServices } from "@/application/services/authorization.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ItransactionManagerService } from "@/application/services/transaction-manager.service.interface";
import { CreateDomain } from "@/entities/models/domain";

export type ICreateDomainUseCase = ReturnType<typeof createDomain>;

export const createDomain =
  (
    domainRepo: IDomainsRepository,
    userDetailRepo: IUsersRepository,
    domainMembershipRepo: IDomainMembershipRepository,
    authorizationService: IAuthorizationServices,
    transactionManagerService: ItransactionManagerService,
    instrumentationService: IInstrumentationService
  ) =>
  (domainData: CreateDomain, userId: string) =>
    instrumentationService.startSpan(
      { name: "create domain usecase", op: "function" },
      async () => {
        const userRole = await userDetailRepo.getUserRole(userId);
        authorizationService.isAuthorizedForAdministrationalAction(userRole);

        return await transactionManagerService.startTransaction(async (trx) => {
          const domainId = await domainRepo.createDomain(domainData, trx);
          await domainMembershipRepo.createDomainMembership(
            {
              domain_id: domainId,
              member_id: userId,
              member_role: "creator",
              membership_status: "active",
            },
            trx
          );
          return domainId;
        });
      }
    );
