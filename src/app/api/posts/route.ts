import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getInjection } from "../../../../DI/container";
import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { generalDomain } from "@/utils/const";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawQuery: PostsQuery = {
    page: parseInt(searchParams.get("page") ?? "1"),
    itemPerPage: parseInt(searchParams.get("itemPerPage") ?? "10"),
    dateEnd: searchParams.get("dateEnd") ?? undefined,
    dateStart: searchParams.get("dateStart") ?? undefined,
    search: searchParams.get("searchQuery") ?? undefined,
    domain: generalDomain,
  };

  // Filter out undefined and reconstruct (cast to PostsQuery as required fields are defined)

  const getPostsController = getInjection("IGetGeneralPostController");
  const res = await getPostsController(rawQuery);
  return NextResponse.json(res);
}
