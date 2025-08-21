import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IGetDomainUseCase } from "@/application/use-case/domain/get-domains.usecase";
import { DomainMembership } from "@/entities/models/domain-membership";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

function presenter(
  domainList: { domain_name: string }[],
  userDomains: DomainMembership[]
) {
  return {
    list: domainList,
    userDomains: userDomains,
  };
}

export type IGetDomainForUserController = ReturnType<
  typeof getDomainsForUserController
>;

export const getDomainsForUserController =
  (
    getDomainUseCase: IGetDomainUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (headers: ReadonlyHeaders) => {
    const session = await authenticationService.getSessionWithHeaders(headers);
    const res = await getDomainUseCase(session.userId);
    return presenter(res.domainList, res.userDomains);
  };
