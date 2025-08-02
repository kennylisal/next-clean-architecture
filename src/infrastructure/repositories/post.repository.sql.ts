import {
  IPostRepository,
  PostsQuery,
} from "@/application/repositories/posts.repository.interface";
import knexDB from "../config/knex_db";
import { Post } from "@/entities/models/post";
import executeQuery from "../utils/query-helper";
import { QueryResponse } from "@/entities/models/response";

export class PostSQLRepositories implements IPostRepository {
  async getPost(id: number): Promise<Post> {
    const query = knexDB("POSTS").select("*").where("post_id", "=", id).first();
    return await executeQuery(query, "SELECT", "POSTS");
  }
  async getPostsForUser(request: PostsQuery): Promise<QueryResponse<Post[]>> {
    const page = Math.max(1, request.page);
    const pageSize = Math.max(10, Math.min(100, request.itemPerPage));
    const offset = (page - 1) * pageSize;

    const query = knexDB("posts").select(
      "post_id",
      "title",
      "created_at",
      "author",
      "body"
    );

    query.modify((query) => {
      if (request.dateEnd && request.dateStart) {
        query.whereBetween("created_at", [request.dateStart, request.dateEnd]);
      }
    });

    const countQuery = await query
      .clone()
      .clearSelect()
      .count("* as total")
      .first();
    query.limit(pageSize).offset(offset);
    const res: Post[] = await executeQuery(query, "SELECT", "POSTS");

    return {
      page: page,
      data: res,
      totalCount: countQuery ? Number(countQuery.total) : 0,
    };
  }
}
