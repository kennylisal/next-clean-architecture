import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { ICreateDomainUseCase } from "@/application/use-case/domain/create-domain.usecase";
import { AuthenticationError, InputParseError } from "@/entities/error/common";
import { CreateDomain, createDomainSchema } from "@/entities/models/domain";
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
    const { error: inputParseError } = createDomainSchema.safeParse(domainData);
    if (inputParseError) {
      throw new InputParseError("Invalid data", { cause: inputParseError });
    }
    const session = await authenticationService.getSessionWithHeaders(headers);

    const res = await createDomainUseCase(domainData, session.userId);
    return presenter(domainData, res);
  };
