"use server";
import { InputPost } from "@/entities/models/post";
import { getInjection } from "../../../../../DI/container";
import { headers } from "next/headers";

export async function submitCreatePost(input: InputPost) {
  const controller = getInjection("ICreatePostController");
  const reqHeaders = await headers();
  return await controller(input, reqHeaders);
}
