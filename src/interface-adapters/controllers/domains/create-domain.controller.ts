import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ICreateDomainUseCase } from "@/application/use-case/domain/create-domain.usecase";
import { InputParseError } from "@/entities/error/common";
import { CreateDomain, createDomainSchema } from "@/entities/models/domain";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type ICreateDomainController = ReturnType<typeof createDomainController>;

export const createDomainController =
  (
    createDomainUseCase: ICreateDomainUseCase,
    authenticationService: IAuthenticationService,
    instrumentationService: IInstrumentationService
  ) =>
  async (domainData: CreateDomain, headers: ReadonlyHeaders) => {
    return await instrumentationService.startSpan(
      { name: "createDomain controller" },
      async () => {
        const { error: inputParseError } =
          createDomainSchema.safeParse(domainData);
        if (inputParseError) {
          throw new InputParseError("Invalid data", { cause: inputParseError });
        }
        const session = await authenticationService.getSessionWithHeaders(
          headers
        );

        const res = await createDomainUseCase(domainData, session.userId);
        return {
          data: domainData,
          domainId: res,
        };
      }
    );
  };
