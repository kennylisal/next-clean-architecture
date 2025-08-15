import { NextRequest, NextResponse } from "next/server";
import { getInjection } from "../../../../../DI/container";

export async function GET(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const { post_id } = await params;

  if (!post_id || isNaN(Number(post_id))) {
    return NextResponse.json(
      { error: "post_id is missing or not a number" },
      { status: 400 }
    );
  }
  const getPostsController = getInjection("IGetPostDetailController");

  const res = await getPostsController("", "", Number(post_id));
  console.log(res);
  return NextResponse.json(res);
}
