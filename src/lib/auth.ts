// "use server";
import { pg_pool } from "@/infrastructure/config/pg_pool";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: pg_pool,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [nextCookies()],

  //   account: {
  //     accountLinking: {
  //       enabled: true,
  //     },
  //   },
});
