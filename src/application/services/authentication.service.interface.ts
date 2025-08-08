import { Session } from "@/src/entities/models/session";
import { User } from "@/src/entities/models/user";

export interface IAuthenticationService {
  signInEmail(email: string, password: string): Promise<boolean>;
  signUpEmail(email: string, password: string): Promise<string>;
  generateSession(): Promise<boolean>;
  // getStringedUserId(): Promise<string>;
  // validateSession(
  //   sessionId: Session["id"]
  // ): Promise<{ user: UserActivation; session: Session }>;
  // validatePasswords(
  //   inputPassword: string,
  //   usersHashedPassword: string
  // ): Promise<boolean>;
  // createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
  //   invalidateSession(sessionId: Session["id"]): Promise<{ blankCookie: Cookie }>;
}
