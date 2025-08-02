import { Box, CircularProgress } from "@mui/material";

export function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "600px",
      }}
    >
      <CircularProgress size="180px" />
    </Box>
  );
}
