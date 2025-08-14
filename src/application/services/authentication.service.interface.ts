import { Session } from "@/entities/models/session";
import { User, UserMetaData } from "@/entities/models/user";

export interface IAuthenticationService {
  signInEmail(email: string, password: string): Promise<boolean>;
  signUpEmail(
    email: string,
    password: string,
    metaData: UserMetaData
  ): Promise<string>;
  deleteUser(idUser: string): Promise<boolean>;
  getUserData(args: string): Promise<User>;
  verifySession(
    sessionId: string | undefined,
    sessionToken: string | undefined
  ): Promise<Session>;
  // getStringedUserId(): Promise<string>;
  // validateSession(
  //   sessionId: Session["id"]
  // ): Promise<{ user: UserActivation; session: Session }>;c
  // validatePasswords(
  //   inputPassword: string,
  //   usersHashedPassword: string
  // ): Promise<boolean>;
  // createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  //   invalidateSession(sessionId: Session["id"]): Promise<{ blankCookie: Cookie }>;
}
