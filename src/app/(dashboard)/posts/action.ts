"use server";
import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { getInjection } from "../../../../DI/container";

export async function getPostsDashboard(request: PostsQuery) {
  try {
    const getPOstsForUserController = getInjection(
      "IGetPostForUserUserController"
    );
    return await getPOstsForUserController("", request);
  } catch (error) {
    throw error;
    // console.log(error);
  }
}
