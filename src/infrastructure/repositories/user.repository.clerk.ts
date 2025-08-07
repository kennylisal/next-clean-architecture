import { IUsersRepository } from "@/application/repositories/users.repository.interface";
import { ClerkError, NotSignedError } from "@/entities/error/common";
import {
  User,
  CreateUser,
  UserMetaData,
  ClerkUserResponse,
} from "@/entities/models/user";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { config } from "dotenv";
config({ path: ".env" });
export class UserRepositoryClerk implements IUsersRepository {
  async getUserData(userId: string): Promise<User> {
    const apiUrl = `https://api.clerk.com/v1/users/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const userClerkData: ClerkUserResponse = data;

      return {
        Domains: [],
        email: userClerkData.email_addresses[0].email_address,
        id: userClerkData.id,
        role: userClerkData.unsafe_metadata.role,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected Error";
      throw new NotSignedError(message);
    }
  }
  async updateUserData(
    userId: string,
    metaData: UserMetaData
  ): Promise<boolean> {
    const apiUrl = `https://api.clerk.com/v1/users/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          unsafe_metadata: { ...metaData },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected Error";
      throw new ClerkError(message);
    }
    // try {
    //   const client = await clerkClient();
    //   await client.users.updateUserMetadata(userId, {
    //     unsafeMetadata: { ...metaData },
    //   });
    //   return true;
    // } catch (error) {
    //   const message =
    //     error instanceof Error ? error.message : "Unexpected Error";
    //   throw new ClerkError(message);
    // }
  }
  loginUser(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerUser(createUser: CreateUser): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
