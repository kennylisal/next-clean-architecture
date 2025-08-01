import { Post } from "@/entities/models/post";
import { RequestQuery } from "@/entities/models/query";
import { QueryResponse } from "@/entities/models/response";

export interface PostsQuery extends RequestQuery {
  dateStart?: string;
  dateEnd?: string;
}
export interface IPostRepository {
  getPost(id: number): Promise<Post | undefined>;
  getPostsForUser(query: PostsQuery): Promise<QueryResponse<Post[]>>;
}
