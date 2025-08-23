import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IGetAvailableDomainsForUserToCreatePostUseCase } from "@/application/use-case/domain/get-avalilable-domains-for-user-to-craete-post.usecase";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

function presenter(list: { domain_name: string; domain_id: number }[]) {
  return list;
}

export type IGetDomainsForCreatePostController = ReturnType<
  typeof getDomainsForCreatePost
>;

export const getDomainsForCreatePost =
  (
    useCase: IGetAvailableDomainsForUserToCreatePostUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (headers: ReadonlyHeaders) => {
    const session = await authenticationService.getSessionWithHeaders(headers);
    const res = await useCase(session.userId);
    return presenter(res);
  };
