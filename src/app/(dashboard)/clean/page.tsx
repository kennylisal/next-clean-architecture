import { PageHeader } from "@/components/page-header/PageHeader";
import { Button, Container } from "@mui/material";
import { Content } from "./content";
import { PostAdd } from "@mui/icons-material";

async function getPosts() {}

export default async function Clean() {
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
      {/* <Content /> */}
    </Container>
  );
}
