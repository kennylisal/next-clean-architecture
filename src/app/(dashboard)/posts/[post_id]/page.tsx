"use server";

import { notFound } from "next/navigation";
import PostDetailPage from "./detail";
import { getInjection } from "../../../../../DI/container";
import { headers } from "next/headers";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";

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
  const data = await getPostDetail(postIdNumber);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PostDetailPage postData={data.postData} />;
    </Suspense>
  );
}

async function getPostDetail(postId: number) {
  const controller = getInjection("IGetPostDetailController");
  const postData = await controller(await headers(), postId);
  return postData;
}
