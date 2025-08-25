import { IDomainsRepository } from "@/application/repositories/domain.repository.interface";
import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";

export type IGetAvailableDomainsForUserToCreatePostUseCase = ReturnType<
  typeof getAvailableDomainsForUserToCreatePost
>;

export const getAvailableDomainsForUserToCreatePost =
  (
    domainsRepo: IDomainsRepository,
    domainMembershipRepo: IDomainMembershipRepository,
    instrumentationService: IInstrumentationService
  ) =>
  (userId: string) =>
    instrumentationService.startSpan(
      { name: "get available domain for create post usecase", op: "function" },
      async () => {
        return await domainsRepo.getAllDomainName();
        // if (userId === "ASKINfVg1o5fkzZSuxR2Dn5YDAIBrZm3") {
        //   return await domainsRepo.getAllDomainName();
        // } else {
        //   return [] as { domain_name: string; domain_id: number }[];
        // }
      }
    );
