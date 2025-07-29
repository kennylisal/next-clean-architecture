import { RequestQuery } from "@/entities/models/query";

export interface PostsQuery extends RequestQuery {
  date?: string;
  userRole?: string;
}
export interface IPostRepository {
  getPost(id: number): Promise<Post | undefined>;
  getPostsForUser(userId: number, query?: PostsQuery): Promise<Post[]>;
  //getPostForGuest
}
