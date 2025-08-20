import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import {
  AuthenticationError,
  SignInError,
  SignUpError,
} from "@/entities/error/common";
import { Session } from "@/entities/models/session";
import { UserMetaData, User } from "@/entities/models/user";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export class BetterAuthAuthenticationServices
  implements IAuthenticationService
{
  async signOutUserClient(headers: ReadonlyHeaders): Promise<boolean> {
    try {
      const res = await auth.api.signOut({
        headers: headers,
      });
      if (!res) {
        throw new AuthenticationError("Perlu Sign up");
      }
      return res.success;
    } catch (error) {
      throw error;
    }
  }
  async getSessionWithHeaders(headers: ReadonlyHeaders): Promise<Session> {
    try {
      const session = await auth.api.getSession({
        headers: headers,
      });
      if (!session) {
        throw new AuthenticationError("Perlu Sign up");
      }
      return {
        id: session.session.id,
        expiresAt: new Date("2025-06-15"),
        userId: session.user.id,
      };
    } catch (error) {
      throw error;
    }
  }
  async signInEmail(email: string, password: string): Promise<boolean> {
    try {
      const res = await auth.api.signInEmail({
        body: {
          email: email,
          password: password,
        },
      });

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected Error Occured";
      throw new SignInError(message);
    }
  }
  async signUpEmail(
    email: string,
    password: string,
    metaData?: UserMetaData
  ): Promise<string> {
    try {
      const res = await auth.api.signUpEmail({
        body: {
          email: email,
          password: password,
          name: "x-not-required",
        },
      });

      console.log(res);
      return res.user.id;
    } catch (error) {
      //   throw error;
      if (error instanceof Error) {
        const message = error.message;
        throw new SignUpError(message);
      }
      if (error instanceof APIError) {
        throw new SignUpError(
          `${error.status} | ${error.message} | ${error.body}`
        );
      }
      throw new SignUpError("Unexpected Error");
    }
  }
  async verifySession(headers: ReadonlyHeaders): Promise<boolean> {
    try {
      const session = await auth.api.getSession({
        headers: headers,
      });
      if (!session) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(idUser: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getUserData(args: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async revokeSession() {
    throw new Error("Method not implemented.");
  }
}
