import { headers } from "next/headers";
import { getInjection } from "../../../../../DI/container";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";
import PostCreateForm from "./create-post";

export default async function Page() {
  const userDomains = await getAvailableDomains();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PostCreateForm domain_data={userDomains} />
    </Suspense>
  );
}

async function getAvailableDomains() {
  const controller = getInjection("IGetDomainsForCreatePostController");
  const domains = controller(await headers());
  return domains;
}
