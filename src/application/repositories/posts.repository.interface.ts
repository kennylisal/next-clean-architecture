import { RequestQuery } from "@/entities/models/query";

export interface PostsQuery extends RequestQuery {
  userRole?: string;
}
export interface IPostRepository {
  getPost(id: number): Promise<Post | undefined>;
  getPostsForUser(query: PostsQuery): Promise<Post[]>;
}
