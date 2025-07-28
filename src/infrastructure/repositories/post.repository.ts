import { IPostRepository } from "@/application/repositories/posts.repository.interface";

class PostRepositories implements IPostRepository {
  getPost(id: number): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  getPostsForUser(userId: number): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
