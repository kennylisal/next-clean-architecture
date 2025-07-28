import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  userName: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
