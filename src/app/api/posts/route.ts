"use server";
import { NextRequest, NextResponse } from "next/server";
import { getInjection } from "../../../../DI/container";
import { itemPerPage } from "@/utils/const";

export async function GET(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const searchQuery = searchParams.get("searchQuery") || undefined;
  const dateStart = searchParams.get("dateStart") || undefined;
  const dateEnd = searchParams.get("dateEnd") || undefined;
  const itemCountPerPage = searchParams.get("itemPerPage")
    ? Number(searchParams.get("itemPerPage"))
    : itemPerPage;
  //
  const controller = getInjection("IGetGeneralPostController");
  const res = await controller({
    domain: 2020,
    itemPerPage: itemCountPerPage,
    page: page,
    dateEnd: dateEnd,
    dateStart: dateStart,
    search: searchQuery,
  });
  return NextResponse.json(res);
}
