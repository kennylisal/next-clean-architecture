import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  role: z.enum(["student", "admin"]),
  fullName: z.string().min(5),
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
