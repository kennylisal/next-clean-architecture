import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { IGetDomainsUseCase } from "@/application/use-case/domain/get-domains.usecase";
import { DomainMembership } from "@/entities/models/domain-membership";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

function presenter(
  domainList: { domain_name: string }[],
  userDomains: DomainMembership[],
  instrumentationService: IInstrumentationService
) {
  return instrumentationService.startSpan(
    { name: "getDomainsForUser presenter", op: "serialize" },
    () => {
      return {
        list: domainList,
        userDomains: userDomains,
      };
    }
  );
}

export type IGetDomainForUserController = ReturnType<
  typeof getDomainsForUserController
>;

export const getDomainsForUserController =
  (
    getDomainUseCase: IGetDomainsUseCase,
    authenticationService: IAuthenticationService,
    instrumentationService: IInstrumentationService
  ) =>
  async (headers: ReadonlyHeaders) => {
    return await instrumentationService.startSpan(
      { name: "getDomainsForUser controller" },
      async () => {
        const session = await authenticationService.getSessionWithHeaders(
          headers
        );
        const res = await getDomainUseCase(session.userId);
        return presenter(
          res.domainList,
          res.userDomains,
          instrumentationService
        );
      }
    );
  };
