import { PostHeader } from "@/entities/models/post";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";
import { GeneralPosts } from "./posts";

export async function getGeneralPost() {
  try {
    const query = await new PostSQLRepositories().getPosts({
      domain: 2020,
      page: 1,
      itemPerPage: 10,
    });
    return query;
  } catch (error) {
    throw error;
  }
}

export default async function GeneralPostWrapper() {
  const posts = await getGeneralPost();
  const headers: PostHeader[] = posts.data.map((post) => ({
    author: post.author,
    created_at: post.created_at,
    domain: "General",
    post_id: post.post_id,
    title: post.title,
  }));
  return <GeneralPosts posts={headers} />;
}
