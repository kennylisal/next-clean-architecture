import { Session } from "@/entities/models/session";

export interface IAuthenticationService {
  getUserId(): string;
  validateSession(
    sessionId: Session["id"]
  ): Promise<{ user: UserActivation; session: Session }>;
  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string
  ): Promise<boolean>;
  //   createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  //   invalidateSession(sessionId: Session["id"]): Promise<{ blankCookie: Cookie }>;
}
