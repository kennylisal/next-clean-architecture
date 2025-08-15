"use server";
import { url_route } from "@/utils/route";
import { redirect } from "next/navigation";

export const loginSuccess = async () => {
  redirect(url_route.posts);
};
