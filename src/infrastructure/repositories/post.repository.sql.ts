import {
  IPostRepository,
  PostsQuery,
} from "@/application/repositories/posts.repository.interface";
import knexDB from "../config/knex_db";
import { CreatePost, Post } from "@/entities/models/post";
import executeQuery from "../utils/query-helper";
import { QueryResponse } from "@/entities/models/response";
import { Knex } from "knex";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ICrashResporterServices } from "@/application/services/crash-reporter.service.interface";
export class PostSQLRepositories implements IPostRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashResporterServices
  ) {}
  async getPosts(
    request: PostsQuery,
    trx?: Knex.Transaction
  ): Promise<QueryResponse<Post[]>> {
    return await this.instrumentationService.startSpan(
      { name: "post repository > getPosts" },
      async () => {
        const db = trx || knexDB;
        const page = Math.max(1, request.page);

        let query = db("posts")
          .select("post_id", "title", "created_at", "author", "body")
          .where("domain_id", "=", request.domain ?? 1);
        query = this.applyQueryFilters(query, request);

        const { queryResult, totalCount } = await this.applyQueryPagination(
          query,
          request
        );
        const res: Post[] = await executeQuery(
          queryResult,
          "SELECT",
          "POSTS",
          this.crashReporterService
        );

        return {
          page: page,
          data: res,
          totalItem: totalCount,
        };
      }
    );
  }

  async getUserPost(
    request: PostsQuery,
    userId: string,
    trx?: Knex.Transaction
  ): Promise<QueryResponse<Post[]>> {
    return await this.instrumentationService.startSpan(
      { name: "post repository > getuserPost" },
      async () => {
        const db = trx || knexDB;
        const page = Math.max(1, request.page);

        let query = db("posts")
          .select("posts.*", "domains.domain_name as domain")
          .where("posts.author", "=", userId)
          .join("domains", "domains.domain_id", "posts.domain_is");
        query = this.applyQueryFilters(query, request);

        const { queryResult, totalCount } = await this.applyQueryPagination(
          query,
          request
        );
        const res: Post[] = await executeQuery(
          queryResult,
          "SELECT",
          "POSTS",
          this.crashReporterService
        );

        return {
          page: page,
          data: res,
          totalItem: totalCount,
        };
      }
    );
  }

  async getPostForUser(
    request: PostsQuery,
    domains: string[],
    trx?: Knex.Transaction
  ): Promise<QueryResponse<Post[]>> {
    return await this.instrumentationService.startSpan(
      { name: "post repository > getPostForUser" },
      async () => {
        const db = trx || knexDB;
        const page = Math.max(1, request.page);

        let query = db("posts")
          .select("posts.*", "domains.domain_name as domain")
          .whereRaw(`posts.domain_id in ${domains}`);
        query = this.applyQueryFilters(query, request);

        const { queryResult, totalCount } = await this.applyQueryPagination(
          query,
          request
        );
        const res: Post[] = await executeQuery(
          queryResult,
          "SELECT",
          "POSTS",
          this.crashReporterService
        );

        return {
          page: page,
          data: res,
          totalItem: totalCount,
        };
      }
    );
  }

  async getPost(id: number, trx?: Knex.Transaction): Promise<Post> {
    return this.instrumentationService.startSpan(
      { name: "post repository > getPost" },
      async () => {
        const db = trx || knexDB;
        const query = db("posts")
          .select("posts.*", "domains.domain_name as domain")
          .where("post_id", "=", id)
          .join("domains", "domains.domain_id", "posts.domain_id")
          .first();
        return await executeQuery(
          query,
          "SELECT",
          "POSTS",
          this.crashReporterService
        );
      }
    );
  }

  async createPost(
    schema: CreatePost,
    trx?: Knex.Transaction
  ): Promise<number> {
    return this.instrumentationService.startSpan(
      { name: "post repository" },
      async () => {
        const db = trx || knexDB;
        const query = db("posts").insert(schema).returning("post_id");
        const result: { post_id: number }[] = await executeQuery(
          query,
          "INSERT",
          "posts",
          this.crashReporterService
        );
        return Number(result[0].post_id);
      }
    );
  }

  applyQueryFilters(
    query: Knex.QueryBuilder,
    request: PostsQuery
  ): Knex.QueryBuilder {
    const qb = query;
    qb.modify((query) => {
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
    return qb;
  }

  async applyQueryPagination(
    query: Knex.QueryBuilder,
    request: PostsQuery
  ): Promise<{ totalCount: number; queryResult: Knex.QueryBuilder }> {
    const page = Math.max(1, request.page);
    const pageSize = Math.max(10, Math.min(100, request.itemPerPage));
    const offset = (page - 1) * pageSize;
    const qb = query;

    const countQuery: { total: number } = await executeQuery(
      query.clone().clearSelect().clearOrder().count("* as total").first(),
      "READ",
      "POSTS",
      this.crashReporterService
    );

    qb.limit(pageSize).offset(offset);
    return {
      totalCount: countQuery ? Number(countQuery.total) : 0,
      queryResult: qb,
    };
  }
}
