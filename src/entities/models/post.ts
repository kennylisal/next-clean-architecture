import z from "zod";

interface Post {
  id: number;
  title: string;
  date: string;
  author: number;
  body: string;
}

export const createPostSchema = z.object({
  body: z.string().min(50),
  title: z.string().min(20),
  author: z.string(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
