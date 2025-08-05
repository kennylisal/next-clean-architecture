import { CreatePost, Post } from "@/entities/models/post";
import { PaginationQuery } from "@/entities/models/query";
import { QueryResponse } from "@/entities/models/response";

export interface PostsQuery extends PaginationQuery {
  dateStart?: string;
  dateEnd?: string;
  orderBy?: "newest" | "oldest";
  search?: string;
  domain?: string[];
}
export interface IPostRepository {
  getPost(id: number): Promise<Post | undefined>;
  getGeneralPost(query: PostsQuery): Promise<QueryResponse<Post[]>>;
  createPost(schema: CreatePost): Promise<boolean>;
  getUserPost(query: PostsQuery): Promise<QueryResponse<Post[]>>;
  getPostForUser(query: PostsQuery): Promise<QueryResponse<Post[]>>;
}
