import { IPostRepository } from "@/application/repositories/posts.repository.interface";
import { DataNotFoundError } from "@/entities/error/common";

export class DummyJsonPostRepositories implements IPostRepository {
  async getPost(id: number): Promise<Post | undefined> {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      if (response.ok) {
        const res: Post = await response.json();
        return res;
      } else {
        throw new DataNotFoundError("Data with specified id not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async getPostsForUser(userId: number): Promise<Post[]> {
    try {
      const response = await fetch(`https://dummyjson.com/posts`);

      if (response.ok) {
        const res = await response.json();
        const x: Post[] = res.posts;
        return x;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
}
