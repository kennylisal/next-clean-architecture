import { LoadingSpinner } from "@/components/loading/loadingSpinner";
import { PageHeader } from "@/components/page-header/PageHeader";
import { JobsSearch } from "@/components/widget/jobs/jobs-search/JobsSearch";
import { PostAdd } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { Suspense } from "react";
import GeneralPostWrapper from "./action";

export default function Home() {
  return (
    <Container maxWidth={"lg"}>
      <PageHeader
        title={"Jobs"}
        breadcrumbs={["Jobs", "List"]}
        renderRight={
          <Button variant={"contained"} startIcon={<PostAdd />}>
            Create
          </Button>
        }
      />
      {/* <JobsSearch handleSearch={}/> */}
      <Suspense fallback={<LoadingSpinner />}>
        <GeneralPostWrapper />
      </Suspense>
    </Container>
  );
}
