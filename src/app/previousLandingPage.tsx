import {
  Box,
  Button,
  Grid,
  Link,
  SvgIcon,
  SvgIconProps,
  Typography,
} from "@mui/material";

// SchoolIcon component using Material UI's SvgIcon
const SchoolIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M12 3L1 9l11 6 11-6-11-6zm0 2.5l6 3.5-6 3.5-6-3.5 6-3.5zm-1 11.5v-4l-5 2.5v5l5-2.5zm2 0l5 2.5v-5l-5-2.5v4z" />
  </SvgIcon>
);

export default function LandingPage() {
  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
          textAlign: "center",
          p: 3,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={3}
          sx={{ maxWidth: "600px" }}
        >
          <Grid>
            <SchoolIcon sx={{ fontSize: 100, color: "primary.main" }} />
          </Grid>
          <Grid>
            <Typography variant="h2" gutterBottom>
              Welcome to Stunden Information System
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h5" color="textSecondary">
              Stay updated with the latest posts and official announcements.
            </Typography>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/signin"
              >
                Sign In
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/signup"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <Typography variant="body2">
              Need help?{" "}
              <Link href="mailto:admin@stunden.edu" underline="hover">
                Contact Admin
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
