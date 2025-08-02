import { PageHeader } from "@/components/page-header/PageHeader";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { FavoriteBorder, OpenInNew } from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function JobDetals() {
  const job = {
    title: "Marketing Manager",
    company: "Globex Corporation",
    location: "New York, NY",
    description:
      "<h3>Job Description</h3><p>We are seeking a results-driven <strong>Marketing Manager</strong> to lead our marketing strategy and drive growth. You will be responsible for creating and executing campaigns that elevate our brand and engage our target audience.</p><h3>Responsibilities</h3><ul>  <li>Develop and implement marketing strategies across digital, content, and social media channels</li>  <li>Manage the marketing budget and allocate resources effectively</li>  <li>Monitor and analyze the performance of marketing campaigns</li>  <li>Collaborate with the sales team to align marketing efforts with business goals</li>  <li>Stay updated on market trends and competitor activities</li></ul><h3>Requirements</h3><ul>  <li>Proven experience in marketing management (5+ years)</li>  <li>Strong understanding of digital marketing, SEO, and content marketing</li>  <li>Excellent communication and leadership skills</li>  <li>Ability to analyze data and make data-driven decisions</li>  <li>Experience managing a team and working cross-functionally</li></ul><h3>Benefits</h3><ul>  <li>Competitive salary with performance bonuses</li>  <li>Health, dental, and vision insurance</li>  <li>Paid time off and flexible working arrangements</li>  <li>Professional development opportunities</li></ul><p>If you're passionate about marketing and ready to make an impact, we'd love to hear from you!</p>",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "Experience in digital marketing",
      "Proven track record of developing and executing successful marketing campaigns",
      "Excellent communication skills",
    ],
    salary: "$80,000 - $100,000 per year",
    tags: ["Marketing", "Digital Marketing", "Communications"],
  };
  const jobsTagsList = job.tags.map((tag, index) => (
    <Chip size={"small"} key={`${tag}_${index}`} label={tag} />
  ));

  return (
    <Container>
      <PageHeader
        title={job.title}
        breadcrumbs={["Jobs", "Details", job.title]}
        renderRight={
          <Stack direction={"row"} spacing={1}>
            <Button
              variant={"outlined"}
              color={"secondary"}
              //   onClick={() => navigate(routes.jobsEdit)}
            >
              Edit
            </Button>
            <Button color={"error"} variant={"outlined"}>
              Remove
            </Button>
            <Button variant={"outlined"} startIcon={<FavoriteBorder />}>
              Save
            </Button>
            <Button variant={"contained"} startIcon={<OpenInNew />}>
              Apply
            </Button>
          </Stack>
        }
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <RichTextEditor readOnly={true} initialValue={job.description} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Requirements:
            </Typography>
            <List sx={{ listStyle: "disc", pl: 5 }}>
              {job.requirements.map((requirement, index) => (
                <ListItem key={index} sx={{ display: "list-item", pl: 1 }}>
                  <ListItemText primary={requirement} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              {job.salary}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Company: <strong>{job.company}</strong>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Location: <strong>{job.location}</strong>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack mt={2} mb={2} direction={"row"} flexWrap={"wrap"} gap={1}>
              {jobsTagsList}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
