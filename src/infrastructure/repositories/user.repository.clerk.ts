import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { NotSignedError, SignUpError } from "@/entities/error/common";
import { User, CreateUser, UserMetaData } from "@/entities/models/user";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export class UserRepositoryClerk implements IUsersRepository {
  async getUserData(id: number): Promise<User> {
    try {
      const { userId } = await auth();
      if (!userId) {
        throw new NotSignedError("has not been signed yet");
      }

      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const { role, createdAt } = user.unsafeMetadata;
      return {
        Domains: [],
        email: user.emailAddresses[0]?.emailAddress || "",
        id: user.id,
        role: role as string,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected Error";
      throw new NotSignedError(message);
    }
  }
}
