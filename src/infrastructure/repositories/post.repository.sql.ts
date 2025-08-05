import {
  IPostRepository,
  PostsQuery,
} from "@/application/repositories/posts.repository.interface";
import knexDB from "../config/knex_db";
import { CreatePost, Post } from "@/entities/models/post";
import executeQuery from "../utils/query-helper";
import { QueryResponse } from "@/entities/models/response";
export class PostSQLRepositories implements IPostRepository {
  async getGeneralPost(request: PostsQuery): Promise<QueryResponse<Post[]>> {
    const page = Math.max(1, request.page);
    const pageSize = Math.max(10, Math.min(100, request.itemPerPage));
    const offset = (page - 1) * pageSize;

    const query = knexDB("posts")
      .select("post_id", "title", "created_at", "author", "body")
      .where("domain_id", "=", request.domain ?? 1);

    query.modify((query) => {
      if (request.dateEnd && request.dateStart) {
        query.whereBetween("created_at", [request.dateStart, request.dateEnd]);
      }
      if (!request.orderBy) {
        if (request.orderBy === "newest") {
          query.orderBy("created_at", "desc");
        } else {
          query.orderBy("created_at", "asc");
        }
      } else {
        query.orderBy("created_at", "desc");
      }
      if (request.search) {
        query.where("title", "ilike", `%${request.search}%`);
      }
    });

    const countQuery = await query
      .clone()
      .clearSelect()
      .clearOrder()
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

  async getPost(id: number): Promise<Post> {
    const query = knexDB("posts")
      .select("posts.*", "domains.domain_name as domain")
      .where("post_id", "=", id)
      .join("domains", "domains.domain_id", "posts.domain_is")
      .first();
    return await executeQuery(query, "SELECT", "POSTS");
  }

  async createPost(schema: CreatePost): Promise<number> {
    const query = knexDB("posts").insert(schema).returning("post_id");
    const result: { post_id: number }[] = await executeQuery(
      query,
      "INSERT",
      "posts"
    );
    return result[0].post_id;
  }

  async getPostForUser(
    request: PostsQuery,
    domains: string[]
  ): Promise<QueryResponse<Post[]>> {
    const page = Math.max(1, request.page);
    const pageSize = Math.max(10, Math.min(100, request.itemPerPage));
    const offset = (page - 1) * pageSize;

    const query = knexDB("posts")
      .select("posts.*", "domains.domain_name as domain")
      .select("posts.*", "domains.domain_name as domain")
      .whereRaw(`posts.domain_id in ${domains}`);

    query.modify((query) => {
      if (request.dateEnd && request.dateStart) {
        query.whereBetween("created_at", [request.dateStart, request.dateEnd]);
      }
      if (!request.orderBy) {
        if (request.orderBy === "newest") {
          query.orderBy("created_at", "desc");
        } else {
          query.orderBy("created_at", "asc");
        }
      } else {
        query.orderBy("created_at", "desc");
      }
      if (request.search) {
        query.where("title", "ilike", `%${request.search}%`);
      }
    });
    const countQuery = await query
      .clone()
      .clearSelect()
      .clearOrder()
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

  //ini untuk cari semua post milik sang author
  async getUserPost(
    request: PostsQuery,
    userId: string
  ): Promise<QueryResponse<Post[]>> {
    const page = Math.max(1, request.page);
    const pageSize = Math.max(10, Math.min(100, request.itemPerPage));
    const offset = (page - 1) * pageSize;

    const query = knexDB("posts")
      .select("posts.*", "domains.domain_name as domain")
      .where("posts.author", "=", userId)
      .join("domains", "domains.domain_id", "posts.domain_is");
    query.modify((query) => {
      if (request.dateEnd && request.dateStart) {
        query.whereBetween("created_at", [request.dateStart, request.dateEnd]);
      }
      if (!request.orderBy) {
        if (request.orderBy === "newest") {
          query.orderBy("created_at", "desc");
        } else {
          query.orderBy("created_at", "asc");
        }
      } else {
        query.orderBy("created_at", "desc");
      }
      if (request.search) {
        query.where("title", "ilike", `%${request.search}%`);
      }
    });
    const countQuery = await query
      .clone()
      .clearSelect()
      .clearOrder()
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
