"use client";
import { PageHeader } from "@/components/page-header/PageHeader";
import { CreateDomain, createDomainSchema } from "@/entities/models/domain";
import { zodResolver } from "@hookform/resolvers/zod";
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
  InputLabel,
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
    formState: { errors, isSubmitting },
  } = useForm<CreateDomain>({
    resolver: zodResolver(createDomainSchema),
    defaultValues: {
      description: "",
      domain_name: "",
      domain_status: "active",
      domain_visibility: "public",
      membership_acceptance: "open",
    },
  });

  const onSubmit = async (data: CreateDomain) => {
    console.log(data);
  };
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader
          title={"Create Domain"}
          breadcrumbs={["Blog", "Create Domain"]}
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
                    label={"Domain Name"}
                    {...register("domain_name")}
                    error={!!errors.domain_name}
                    helperText={errors.domain_name?.message}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    label={"Domain description"}
                    multiline
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </FormControl>
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
                <Typography>Domain Setting</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2} justifyContent={"flex-start"}>
                  <InputLabel {...register("domain_visibility")}>
                    Domain Visibility
                  </InputLabel>
                  <Select
                    label="Domain Visibility"
                    value={getValues("domain_visibility")}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="restricted">Restricted</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                  </Select>
                  <InputLabel {...register("membership_acceptance")}>
                    Membership Acceptance
                  </InputLabel>
                  <Select
                    label="Membership Acceptance"
                    value={getValues("membership_acceptance")}
                  >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="invite-only">Invite Only</MenuItem>
                    <MenuItem value="confirmation">Confirmation</MenuItem>
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
