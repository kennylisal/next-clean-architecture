"use client";
import { PageHeader } from "@/components/page-header/PageHeader";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { getInjection } from "../../../../DI/container";

export default function CreatePage() {
  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
    { id: 4, name: "Category 4" },
    { id: 5, name: "Category 5" },
  ];
  const categoriesList = categories.map((category) => (
    <FormGroup key={category.id} aria-label="position" row>
      <FormControlLabel control={<Checkbox />} label={category.name} />
    </FormGroup>
  ));
  return (
    <Container maxWidth={"xl"}>
      <PageHeader
        title={"Create post"}
        breadcrumbs={["Blog", "Create post"]}
        renderRight={
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            <Button variant={"outlined"}>Cancel</Button>
            <Button variant={"contained"}>Publish</Button>
          </Stack>
        }
      />

      <form>
        <Grid container spacing={2}>
          <Grid size={{ xs: 8 }}>
            <Paper sx={{ padding: 4 }}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <TextField
                    label={"Post title"}
                    // {...register(BlogPostFieldsNames.title)}
                  />
                  {true && (
                    <Typography color={"error"}>
                      {/* {errors.title.message} */}
                    </Typography>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label={"Post description"}
                    multiline
                    // {...register(BlogPostFieldsNames.description)}
                  />
                  {true && (
                    <Typography color={"error"}>
                      {/* {errors.description.message} */}
                    </Typography>
                  )}
                </FormControl>

                <RichTextEditor
                  // onChange={onChange}
                  placeholder={"Post content"}
                />
                {true && (
                  <Typography color={"error"}>
                    {/* {fieldState.error.message} */}
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>General</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2} justifyContent={"flex-start"}>
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        control={<Switch />}
                        label={"Public post"}
                      />
                    </FormGroup>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={"Pin to the top"}
                      />
                    </FormGroup>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={"Waiting for the review"}
                      />
                    </FormGroup>
                  </FormControl>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField placeholder={"Search categories"} size={"small"} />
                  <Stack>{categoriesList}</Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
