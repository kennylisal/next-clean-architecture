import { IDomainsRepository } from "@/application/repositories/domain.repository.interface";
import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";

export type IGetDomainsUseCase = ReturnType<typeof getDomains>;

export const getDomains =
  (
    domainsRepo: IDomainsRepository,
    domainMembershipRepo: IDomainMembershipRepository,
    instrumentationService: IInstrumentationService
  ) =>
  (userId: string) =>
    instrumentationService.startSpan(
      { name: "get domains usecase", op: "function" },
      async () => {
        //ASKINfVg1o5fkzZSuxR2Dn5YDAIBrZm3
        const domainList = await domainsRepo.getAllDomainName();
        const userDomains = await domainMembershipRepo.getUserMemberships(
          userId
        );
        return {
          domainList: domainList,
          userDomains: userDomains,
        };
      }
    );
