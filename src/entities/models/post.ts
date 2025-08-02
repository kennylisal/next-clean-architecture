import z from "zod";

export interface Post {
  post_id: number;
  title: string;
  created_at: string;
  author: string;
  body: string;
}

export const createPostSchema = z.object({
  body: z.string().min(50),
  title: z.string().min(20),
  author: z.string(),
});

export type CreatePost = z.infer<typeof createPostSchema>;

export interface PostHeader {
  post_id: number;
  title: string;
  created_at: string;
  author: string;
}
