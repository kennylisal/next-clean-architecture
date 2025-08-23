import {
  IPostRepository,
  PostsQuery,
} from "@/application/repositories/posts.repository.interface";
import { CreatePost, Post } from "@/entities/models/post";
import { QueryResponse } from "@/entities/models/response";

export class MockPostRepositories implements IPostRepository {
  private _posts: Post[];
  constructor() {
    this._posts = [
      {
        body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
        author: "abc",
        created_at: "2025-07-08",
        post_id: 1,
        title: "His mother had always taught him",
        domain_id: "general",
      },
      {
        body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
        author: "abc",
        created_at: "2025-07-08",
        post_id: 2,
        title: "He was an expert but not in a discipline",
        domain_id: "general",
      },
      {
        body: "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
        author: "abc",
        created_at: "2025-07-08",
        post_id: 3,
        title: "Dave watched as the forest burned up on the hill.",
        domain_id: "general",
      },
    ];
  }
  createPost(schema: CreatePost): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getPostForUser(query: PostsQuery): Promise<QueryResponse<Post[]>> {
    throw new Error("Method not implemented.");
  }
  async getUserPost(query: PostsQuery): Promise<QueryResponse<Post[]>> {
    return {
      page: 1,
      totalItem: 10,
      data: [
        {
          body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
          author: "abc",
          created_at: "2025-07-08",
          post_id: 2,
          title: "He was an expert but not in a discipline",
          domain_id: "general",
        },
        {
          body: "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
          author: "abc",
          created_at: "2025-07-08",
          post_id: 3,
          title: "Dave watched as the forest burned up on the hill.",
          domain_id: "general",
        },
      ],
    };
  }

  async getPost(id: number): Promise<Post> {
    return this._posts[0];
  }
  async getPosts(request: PostsQuery): Promise<QueryResponse<Post[]>> {
    return {
      data: this._posts,
      page: 1,
      totalItem: this._posts.length,
    };
  }
}
