import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
  fullName: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema
  .pick({
    email: true,
    role: true,
    fullName: true,
  })
  .merge(z.object({ password: z.string().min(6).max(255) }));

export type CreateUser = z.infer<typeof createUserSchema>;
