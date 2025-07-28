export interface IPostRepository {
  getPost(id: number): Promise<Post | undefined>;
  getPostsForUser(userId: number): Promise<Post[]>;
  //getPostForGuest
}
