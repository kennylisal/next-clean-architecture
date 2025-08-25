"use server";

import { notFound, redirect } from "next/navigation";
import { getInjection } from "../../../../../DI/container";
import { headers } from "next/headers";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";
import { PostDetail } from "./detail";
import { AuthenticationError } from "@/entities/error/common";
import { ErrorDisplay } from "@/components/error/error_display";

interface DetailPostProps {
  params: {
    post_id: string;
  };
}
export default async function Page({ params }: DetailPostProps) {
  const { post_id } = await params;

  // Assert post_id is a valid number at the start
  const postIdNumber = Number(post_id);
  if (isNaN(postIdNumber)) {
    notFound(); // Handle invalid (non-numeric) post_id by returning 404
  }
  // const data = await getPostDetail(postIdNumber);
  let data: Awaited<ReturnType<typeof getPostDetail>>;
  let errMessage: string | null = null;

  try {
    data = await getPostDetail(postIdNumber);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }
    errMessage = "Failed to fetch data";
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {errMessage ? (
        <ErrorDisplay text={errMessage} />
      ) : (
        <PostDetail postData={data!.postData} />
      )}
    </Suspense>
  );
}

async function getPostDetail(postId: number) {
  const controller = getInjection("IGetPostDetailController");
  const postData = await controller(await headers(), postId);
  return postData;
}
