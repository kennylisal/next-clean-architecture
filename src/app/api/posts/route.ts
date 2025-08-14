import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query: PostsQuery = {
    page: parseInt(searchParams.get("page") ?? "1"),
    itemPerPage: parseInt(searchParams.get("itemPerPage") ?? "10"),
    domain: parseInt(searchParams.get("domain") ?? "2020"),
    // Add other filters from searchParams if needed
  };
  const res = await new PostSQLRepositories().getPosts({
    domain: 2020,
    page: 1,
    itemPerPage: 10,
  });
  return NextResponse.json(res);
}
