import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  user_email: z.email(),
  role: z.enum(["student", "admin"]),
});

// export type User = z.infer<typeof userSchema>;
export interface User {
  id: string;
  email: string;
  role: ACCOUNT_ROLE;
  Domains: string[];
}

export interface UserMetaData {
  role: string;
  createdAt: string;
}

export interface ClerkUserResponse {
  id: string;
  email_addresses: { email_address: string }[];
  unsafe_metadata: UserMetaData;
}

export const createUserSchema = userSchema
  .pick({
    user_email: true,
    role: true,
  })
  .merge(z.object({ user_password: z.string().min(6).max(255) }));

export type CreateUser = z.infer<typeof createUserSchema>;

export const loginUserSchema = userSchema
  .pick({ user_email: true })
  .merge(z.object({ user_password: z.string().min(6).max(255) }));

export type LoginUser = z.infer<typeof loginUserSchema>;

export enum ACCOUNT_ROLE {
  STUDENT = "student",
  TEACHER = "teacher",
}
