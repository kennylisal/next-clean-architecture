import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { User, UserMetaData } from "@/entities/models/user";
import { clerkClient } from "@clerk/nextjs/server";

export class ClarkAuthenticationService implements IAuthenticationService {
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
  signInEmail(email: string, password: string): Promise<boolean> {
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

  deleteUser(idUser: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
