import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { Session } from "@/entities/models/session";

export class AuthenticationService implements IAuthenticationService {
  getStringedUserId(): string {
    throw new Error("Method not implemented.");
  }
  validateSession(
    sessionId: Session["id"]
  ): Promise<{ user: UserActivation; session: Session }> {
    throw new Error("Method not implemented.");
  }
  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
