import z from "zod";

export interface Post {
  post_id: number;
  title: string;
  created_at: string;
  author: string;
  body: string;
  domain: string;
}

export const createPostSchema = z.object({
  body: z.string().min(50),
  title: z.string().min(20),
  author: z.string(),
  domain_id: z.number(),
});

export type CreatePost = z.infer<typeof createPostSchema>;

export const inputPostSchema = createPostSchema.omit({ author: true });
export type InputPost = z.infer<typeof inputPostSchema>;

export interface PostHeader {
  post_id: number;
  title: string;
  created_at: string;
  author: string;
  domain: string;
}
