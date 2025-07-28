import { Button, Container, Stack } from "@mui/material";
import { PageHeader } from "@/components/page-header/PageHeader";

// import JobsForm from "../../../widgets/jobs/jobs-form/JobsForm";
import JobsForm from "@/components/widget/jobs/jobs-form/JobsForm";

export default function JobsCreate() {
  return (
    <Container>
      <PageHeader
        title={"Create Job"}
        breadcrumbs={["Jobs", "Create"]}
        renderRight={
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            <Button variant={"outlined"} color={"secondary"}>
              Cancel
            </Button>
            <Button variant={"contained"}>Publish</Button>
          </Stack>
        }
      />

      <JobsForm />
    </Container>
  );
}
