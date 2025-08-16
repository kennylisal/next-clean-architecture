import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { AuthenticationError } from "@/entities/error/common";
import { Session } from "@/entities/models/session";
import { User, UserMetaData } from "@/entities/models/user";
import { clerkClient } from "@clerk/nextjs/server";

export class ClerkAuthenticationService implements IAuthenticationService {
  async verifySession(
    sessionId: string | undefined,
    sessionToken: string | undefined
  ): Promise<Session> {
    if (!sessionId || !sessionToken) {
      throw new AuthenticationError("Required Login");
    }
    const client = await clerkClient();
    const res = await client.sessions.verifySession(sessionId, sessionToken);
    return {
      id: res.id,
      userId: res.userId,
      expiresAt: new Date(res.expireAt),
    };
  }
  async getUserData(userId: string): Promise<User> {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    return {
      id: user.id,
      Domains: [],
      email: user.emailAddresses[0].emailAddress,
      role: (user.unsafeMetadata as unknown as UserMetaData).role,
    };
  }
  async signInEmail(email: string, password: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async signUpEmail(
    email: string,
    password: string,
    metaData: UserMetaData
  ): Promise<string> {
    const client = await clerkClient();
    const user = await client.users.createUser({
      emailAddress: [email],
      password: password,
      unsafeMetadata: { ...metaData },
    });

    return user.id;
  }

  async deleteUser(idUser: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
