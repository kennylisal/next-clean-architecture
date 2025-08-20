import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { ICreateDomainUseCase } from "@/application/use-case/domain/create-domain.usecase";
import { AuthenticationError } from "@/entities/error/common";
import { CreateDomain } from "@/entities/models/domain";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

function presenter(domainData: CreateDomain, newDomainId: number) {
  return {
    data: domainData,
    domainId: newDomainId,
  };
}

export type ICreateDomainController = ReturnType<typeof createDomainController>;

export const createDomainController =
  (
    createDomainUseCase: ICreateDomainUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (domainData: CreateDomain, headers: ReadonlyHeaders) => {
    const session = await authenticationService.getSessionWithHeaders(headers);
    if (!session) {
      throw new AuthenticationError("Session is not valid");
    }
    const res = await createDomainUseCase(domainData, session.userId);
    return presenter(domainData, res);
  };
