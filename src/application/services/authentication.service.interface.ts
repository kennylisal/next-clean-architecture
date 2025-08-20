import { Session } from "@/entities/models/session";
import { User, UserMetaData } from "@/entities/models/user";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export interface IAuthenticationService {
  signInEmail(email: string, password: string): Promise<boolean>;
  signUpEmail(
    email: string,
    password: string,
    metaData?: UserMetaData
  ): Promise<string>;
  deleteUser(idUser: string): Promise<boolean>;
  getUserData(args: string): Promise<User>;
  verifySession(headers: ReadonlyHeaders): Promise<boolean>;
  getSessionWithHeaders(headers: ReadonlyHeaders): Promise<Session>;
  signOutUserClient(headers: ReadonlyHeaders): Promise<boolean>;
}
