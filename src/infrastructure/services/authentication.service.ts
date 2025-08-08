"use server";
import { auth } from "@/lib/auth";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { headers } from "next/headers";

export class AuthenticationBestAuthService implements IAuthenticationService {
  async signInEmail(email: string, password: string): Promise<boolean> {
    try {
      const res = await auth.api.signInEmail({
        body: {
          email: email,
          password: password,
        },
      });
      console.log(res);
      return true;
    } catch (error) {
      throw error;
    }
  }
  async signUpEmail(email: string, password: string): Promise<string> {
    try {
      const res = await auth.api.signUpEmail({
        body: {
          email: email,
          password: password,
          name: "kenny",
        },
      });

      return res.token || "token signup";
    } catch (error) {
      throw error;
    }
  }
  async generateSession(): Promise<boolean> {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return false;
    }
    return true;
  }
}
