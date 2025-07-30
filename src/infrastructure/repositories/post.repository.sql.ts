import {
  IPostRepository,
  PostsQuery,
} from "@/application/repositories/posts.repository.interface";

export class PostSQLRepositories implements IPostRepository {
  getPost(id: number): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  getPostsForUser(query: PostsQuery): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
