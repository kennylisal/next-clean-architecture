import { CreatePost, Post } from "@/entities/models/post";
import { PaginationQuery } from "@/entities/models/query";
import { QueryResponse } from "@/entities/models/response";
import { ITransaction } from "@/entities/models/transaction.interface";

export interface PostsQuery extends PaginationQuery {
  dateStart?: string;
  dateEnd?: string;
  orderBy?: "newest" | "oldest";
  search?: string;
  domain: number;
  // domain?: number;
}
export interface IPostRepository {
  getPost(id: number): Promise<Post>;
  getPosts(query: PostsQuery): Promise<QueryResponse<Post[]>>;
  createPost(schema: CreatePost, trx?: ITransaction): Promise<number>;
  getUserPost(
    query: PostsQuery,
    userId: string
  ): Promise<QueryResponse<Post[]>>;
  getPostForUser(
    query: PostsQuery,
    domains: string[]
  ): Promise<QueryResponse<Post[]>>;
}
