"use client";
import { PageHeader } from "@/components/page-header/PageHeader";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { InputPost, inputPostSchema } from "@/entities/models/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function Page() {
  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InputPost>({
    resolver: zodResolver(inputPostSchema),
    defaultValues: {
      body: "",
      domain_id: 2020,
      title: "",
    },
  });
  const onSubmit = async (data: InputPost) => {
    console.log(data);
  };

  return (
    <Container maxWidth={"xl"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader
          title={"Create post"}
          breadcrumbs={["Blog", "Create post"]}
          renderRight={
            <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
              <Button variant={"outlined"}>Cancel</Button>
              <Button variant={"contained"} type="submit">
                Publish
              </Button>
            </Stack>
          }
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 8 }}>
            <Paper sx={{ padding: 4 }}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <TextField
                    label={"Post Title"}
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </FormControl>

                <RichTextEditor
                  placeholder={"Post content"}
                  onChange={(value) => {
                    setValue("body", value as string);
                  }}
                />
                {errors.body && (
                  <Typography color={"error"}>
                    {errors.body?.message}
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
                  <Select
                    label="Membership Acceptance"
                    value={getValues("domain_id")}
                  >
                    <MenuItem value={2020}>General</MenuItem>
                    <MenuItem value={2021}>Teacher Only</MenuItem>
                  </Select>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
